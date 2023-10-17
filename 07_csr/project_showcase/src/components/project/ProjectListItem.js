import { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { useNavigate, Link, useOutletContext, useLocation, useLoaderData } from "react-router-dom";

const ProjectListItem = ({project}) => {
  // const {image, name, link, about, phase} = project
  const [clapCount, setClapCount] = useState(0);
  // const [currentProject, setCurrentProject] = useState(null);
  const {setEditingModeId, handleDelete} = useOutletContext()
  const {projectId} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const currentProject = useLoaderData();

  const handleClap = () => setClapCount(clapCount + 1);

  // useEffect(() => {
  //   if (!project) {
  //     fetch(`http://localhost:4000/projects/${projectId}`)
  //     .then(r => {
  //       if (r.ok) {
  //         r.json().then(setCurrentProject)
  //       } else {
  //         navigate("/projects")
  //       }
  //     })
  //     .catch(error => alert(error))
  //   }
  // }, [project, projectId]);

  const handleEditMode = () => {
    setEditingModeId(id)
    navigate(`/projects/${id}/edit`)
  }

  if (!project && !currentProject) {
    return <h3>Loading ...</h3>
  }
  const { id, image, name, link, about, phase } = project || currentProject
  return (
    <li className={project ? "card" : "solo-card"}>
      <figure className="image">
        <img src={image} alt={name} />
        <button className="claps" onClick={handleClap}>
          👏{clapCount}
        </button>
      </figure>

      <section className="details">
        {location.pathname === "/projects" ? (
          <Link to={`/projects/${id}`}><h4>{name}</h4></Link>
        ) : <h4>{name}</h4>}
        <p>{about}</p>
        {(link)? (
          <p>
            <a href={link}>Link</a>
          </p>
        ) : null}
      </section>

      <footer className="extra">
        <span className="badge blue">Phase {phase}</span>
        {location.pathname !== "/projects" ? <div className="manage">
          <button onClick={handleEditMode}><FaPencilAlt /></button>
          <button onClick={() => handleDelete(id)}><FaTrash /></button>
        </div> : null}
      </footer>
    </li>
  );
}

export const projectListItemLoader = async ({ params }) => {
  const res = await fetch(`http://localhost:4000/projects/${params.projectId}`)
  if (!res.ok) {
    throw new Response("Not Found", { status: 404 }); 
  }
  return await res.json();
}

export default ProjectListItem;
