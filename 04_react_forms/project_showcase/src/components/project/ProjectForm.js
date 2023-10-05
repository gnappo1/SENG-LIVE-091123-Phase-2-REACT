import { useState } from "react";
import {object, string, number, date} from "yup"

const ProjectForm = ({handleAddProject}) => {

  // const [name, setName] = useState("");
  // const [about, setAbout] = useState("");
  // const [phase, setPhase] = useState("");
  // const [link, setLink] = useState("");
  // const [image, setImage] = useState("");
  const initialState = {
    name: "",
    about: "",
    phase: "",
    link: "",
    image: "",
  }

  const projectSchema = object({
    name: string().required("Name is required!"),
    about: string().required("About is required!"),
    phase: string().required("Phase is required!"),
    link: string().required("Link is required!"),
    image: string().required("Image is required!"),
  })

  const [formData, setFormData] = useState(initialState)

  // const handleChange = (e) => {
  //   setFormData(currentFormData => {
  //     return {
  //       ...currentFormData,
  //       [e.target.name]: e.target.value
  //     }
  //   })
  // }

  const handleChange = ({target: {name, value}}) => {
    setFormData(currentFormData => {
      return {
        ...currentFormData,
        [name]: value
      }
    })
  }

  const validateData = () => {
    return Object.values(formData).every(el => el.trim())
  }

  const handleSubmit = (e) => {
    //! 1. NO PAGE REFRESHES EVEEEEEEEER (preventDefault)
    e.preventDefault()
    //! 2. Compose all the info into a single obj
    // const newProject = {name, about, phase, link, image}

    //! 3. Create a temporary id? (when is it needed???)
      //* is there a data bank involved? (db, json-server, etc)? If so, no need to create a temp id
      //* local collection, I might need it
      //* PESSIMISTIC vs OPTIMISTIC
    // if (validateData()) {

    //   fetch("http://localhost:4000/projects", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json" 
    //     },
    //     body: JSON.stringify(formData)
    //   })
    //   .then(resp => resp.json())
    //   .then(createdProject => {
    //     //! 4. Fire a POST fetch call that on success will call a helper function that would send the new obj to our collection
    //     handleAddProject(createdProject)
    //     //! 5. Reset the form IN CASE OF A SUCCESS
    //     setFormData(initialState)
    //   })
    //   .catch(err => alert(err))
    // } else {
    //   alert("Please fill out every form field!")
    // }

    projectSchema
    .validate(formData)
    .then(validFormData => {
      fetch("http://localhost:4000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(validFormData)
      })
      .then(resp => resp.json())
      .then(createdProject => {
        //! 4. Fire a POST fetch call that on success will call a helper function that would send the new obj to our collection
        handleAddProject(createdProject)
        //! 5. Reset the form IN CASE OF A SUCCESS
        setFormData(initialState)
      })
    })
    .catch(validationError => {
      alert(validationError.message)
    })

  }

  return (
    <section>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Add New Project</h3>

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

        <button type="submit">Add Project</button>
      </form>
    </section>
  );
};

export default ProjectForm;
