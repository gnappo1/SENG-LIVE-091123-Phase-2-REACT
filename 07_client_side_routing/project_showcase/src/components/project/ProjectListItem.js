import { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { Link, useParams, useLocation, useOutletContext, useNavigate } from "react-router-dom";

const ProjectListItem = ({ project }) => {
  // const {image, name, link, about, phase} = project
  const [clapCount, setClapCount] = useState(0);
  const [currentProject, setCurrentProject] = useState(null);
  const { projectId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const {setEditingModeId, handleDelete} = useOutletContext()

  useEffect(() => {
    if (projectId) {
      fetch(`http://localhost:4000/projects/${projectId}`)
      .then(r => r.json())
      .then(setCurrentProject)
      .catch(error => alert(error))
    }
  }, [projectId]);

  const handleClap = () => setClapCount(clapCount + 1);

  const handleDeleteEl = () => {
    handleDelete(id)
    navigate("/projects")
  }

  if (!project && !currentProject) {
    return <h3>Loading...</h3>
  }

  const {id, image, name, link, about, phase} = project || currentProject

  return (
    <li className={projectId ? "solo-card" : "card"}>
      <figure className="image">
        <img src={image} alt={name} />
        <button className="claps" onClick={handleClap}>
          👏{clapCount}
        </button>
      </figure>

      <section className="details">
        {location.pathname === "/projects" ? <Link to={`/projects/${id}`}><h4>{name}</h4></Link> : <h4>{name}</h4>}
        <p>{about}</p>
        {link ? (
          <p>
            <a href={link}>Link</a>
          </p>
        ) : null}
      </section>

      <footer className="extra">
        <span className="badge blue">Phase {phase}</span>
        {location.pathname === "/projects" ? null : <div className="manage">
          <button onClick={() => setEditingModeId(id)}><FaPencilAlt /></button>
          <button onClick={handleDeleteEl}><FaTrash /></button>
        </div>}
      </footer>
    </li>
  );
}

export const ProjectListItemLoader = async () => { 
  
 }
export default ProjectListItem;
