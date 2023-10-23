import ProjectListItem from "./ProjectListItem";

const ProjectList = ({projects, loadProjects, searchQuery, phaseSelected}) => {
  const handleClick = () => {
    loadProjects();
  };
  
  const finalProjects = projects
  .filter(project => {
    return phaseSelected === "All" || project.phase === phaseSelected
  })
  .filter(project => {
    return project.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // const searchResults = filteredProjects.filter(project => {
  //   return searchQuery === "" || project.name.toLowerCase().includes(searchQuery.toLowerCase())
  // })
  
  const renderProjects = () => {
    return finalProjects.map(project => (
      <ProjectListItem
        key={project.id}
        {...project}
      />
      ))
  }

  return (
    <section>
      <h2>Projects</h2>
      <button onClick={handleClick}>Load Projects</button>
      <ul className="cards">{renderProjects()}</ul>
    </section>
  );
};

export default ProjectList;