import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa"

const ProjectListItem = ({ id, image, name, link, about, phase, setEditingModeId, handleDelete }) => {
  // const {image, name, link, about, phase} = project
  const [clapCount, setClapCount] = useState(0);

  const handleClap = () => setClapCount(clapCount + 1);

  return (
    <li className="card">
      <figure className="image">
        <img src={image} alt={name} />
        <button className="claps" onClick={handleClap}>
          👏{clapCount}
        </button>
      </figure>

      <section className="details">
        <h4>{name}</h4>
        <p>{about}</p>
        {link ? (
          <p>
            <a href={link}>Link</a>
          </p>
        ) : null}
      </section>

      <footer className="extra">
        <span className="badge blue">Phase {phase}</span>
        <div className="manage">
          <button onClick={() => setEditingModeId(id)}><FaPencilAlt /></button>
          <button onClick={() => handleDelete(id)}><FaTrash /></button>
        </div>
      </footer>
    </li>
  );
}

export default ProjectListItem;
