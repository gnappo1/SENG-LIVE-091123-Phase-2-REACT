import { useState } from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projects }) => {
  const [phaseSelected, setPhaseSelected] = useState("All");

  
  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.slice(-1)
      setPhaseSelected(Number(phase))
    }
  }

  const filteredProjects = projects.filter(project => {
    return phaseSelected === "All" || project.phase === phaseSelected
  })
  
  const projectListItems = filteredProjects.map((project) => (
    <ProjectListItem key={project.id} {...project} />
  ));

  return (
    <section>
      <h2>Projects</h2>

      <div className="filter" onClick={handlePhaseSelection}>
        <button>All</button>
        <button>Phase 5</button>
        <button>Phase 4</button>
        <button>Phase 3</button>
        <button>Phase 2</button>
        <button>Phase 1</button>
      </div>
      <input type="text" placeholder="Search..."/>

      <ul className="cards">{projectListItems}</ul>
    </section>
  );
};

export default ProjectList;
