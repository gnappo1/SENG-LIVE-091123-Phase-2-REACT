import { useState } from 'react';
import ProjectListItem from "./ProjectListItem";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");

  
  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.slice(-1)
      setPhaseSelected(Number(phase))
    }
  }
  
  const handleClick = () => {
    loadProjects();
  };
  
  const loadProjects = () => {
    fetch("http://localhost:4000/projects")
    .then((res) => res.json())
    .then((projects) => setProjects(projects));
  }
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  
  const filteredProjects = projects.filter(project => {
    return phaseSelected === "All" || project.phase === phaseSelected
  })

  const searchResults = filteredProjects.filter(project => {
    return searchQuery === "" || project.name.toLowerCase().includes(searchQuery.toLowerCase())
  })
  
  const renderProjects = (projects) => {
    return searchResults.map(project => (
      <ProjectListItem
      key={project.id}
      {...project}
      />
      ))
  }

  return (
    <section>
      <button onClick={handleClick}>Load Projects</button>
      <h2>Projects</h2>

      <div className="filter" onClick={handlePhaseSelection}>
        <button>All</button>
        <button>Phase 5</button>
        <button>Phase 4</button>
        <button>Phase 3</button>
        <button>Phase 2</button>
        <button>Phase 1</button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />

      <ul className="cards">{renderProjects(searchResults)}</ul>
    </section>
  );
};

export default ProjectList;