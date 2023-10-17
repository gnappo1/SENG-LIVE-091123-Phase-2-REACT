import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useLocation, useLoaderData } from "react-router-dom";
import {object, string} from "yup"

const initialState = {
  name: "",
  about: "",
  phase: "",
  link: "",
  image: "",
}

const URL = "http://localhost:4000/projects"

const ProjectForm = () => {

  const [formData, setFormData] = useState(initialState)
  const {handleAddProject, editModeProjectId, handlePatchProject, setEditingModeId} = useOutletContext()
  const navigate = useNavigate()
  const location = useLocation()
  const currentProject = useLoaderData()

  useEffect(() => {
    if (currentProject) {
      setFormData(currentProject)
    }
  }, [currentProject]);

  useEffect(() => {
    if (location.pathname === "/projects/new") {
      setEditingModeId(null)
      setFormData(initialState)
    }

  }, [location]);

  const projectSchema = object({
    name: string().required("Name is required!"),
    about: string().required("About is required!"),
    phase: string().required("Phase is required!"),
    link: string().required("Link is required!"),
    image: string().required("Image is required!"),
  })

  const handleChange = ({target: {name, value}}) => {
    setFormData(currentFormData => {
      return {
        ...currentFormData,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    projectSchema
    .validate(formData)
    .then(validFormData => {
        const url = `${URL}${editModeProjectId ? `/${editModeProjectId}` : ""}`
        const method = editModeProjectId ? "PATCH" : "POST"
        fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(validFormData)
        })
        .then(resp => resp.json())
        .then(projectFromDb => {
          setFormData(initialState)
          if (editModeProjectId) {
              handlePatchProject(projectFromDb) 
              setEditingModeId(null)
              navigate(`/projects/${editModeProjectId}`)
            } else {
              handleAddProject(projectFromDb)
              navigate("/projects")
          } 
        })
        .catch(err => alert(err))
    })
    .catch(validationError => {
      alert(validationError.message)
    })
  }

  return (
    <section>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>{editModeProjectId ? "Update Project" : "Add New Project"}</h3>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>

        <label htmlFor="about">About</label>
        <textarea id="about" name="about"  value={formData.about} onChange={handleChange}/>

        <label htmlFor="phase">Phase</label>
        <select name="phase" id="phase" value={formData.phase} onChange={handleChange}>
          <option>Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input type="text" id="link" name="link"  value={formData.link} onChange={handleChange}/>

        <label htmlFor="image">Screenshot</label>
        <input type="text" id="image" name="image"  value={formData.image} onChange={handleChange}/>

        <button type="submit">{editModeProjectId ? "Update" : "Create"}</button>
      </form>
        <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
};

export const projectFormLoader = async ({ params }) => { 
  const res = await fetch(`http://localhost:4000/projects/${params.projectId}`)
  if (!res.ok) {
    throw new Response("Not Found", { status: 404 }); 
  }
  return await res.json();
}

export default ProjectForm;
