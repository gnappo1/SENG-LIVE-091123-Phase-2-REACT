import ProjectListItem from "./ProjectListItem";
import { useOutletContext } from "react-router-dom";
const ProjectList = () => {
  const { projects, phaseSelected, searchQuery, setEditingModeId, handleDelete } = useOutletContext()
  
  const finalProjects = projects?.filter(project => {
    return (phaseSelected === "All" || project.phase === phaseSelected) && (project.name.toLowerCase().includes(searchQuery.toLowerCase()))
  })

  const renderProjects = () => {
    return finalProjects?.map(project => (
      <ProjectListItem
      key={project.id}
      setEditingModeId={setEditingModeId}
      handleDelete={handleDelete}
      project={project}
      />
      ))
    }

  return (
    <section>
      <h2>Projects</h2>
      <ul className="cards">{renderProjects()}</ul>
    </section>
  );
};

export default ProjectList;