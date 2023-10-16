import { useState, useEffect, useCallback } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
// import ProjectForm from "./components/project/ProjectForm";
// import ProjectList from "./components/project/ProjectList";
// import SearchBar from "./components/search/SearchBar";
// import ButtonsFilter from "./components/search/ButtonsFilter";
const URL = "http://localhost:4000/projects"
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [editModeProjectId, setEditModeProjectId] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects`)
        const data = await response.json()
        setProjects(data);
      } catch (error) {
        alert(error)
      }
    })()
  }, [])
  
  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.slice(-1)
      setPhaseSelected(Number(phase))
    }
  }

  const handleSearch = (e) => {
      setSearchQuery(e.target.value)
  }

  const handleAddProject = (createdProject) => {
    setProjects(currentProjectList => [createdProject, ...currentProjectList]) //! new state derived based on current state
    // setProjects([createdProject, ...projects])
  }

  const handlePatchProject = (updatedProject) => {
    setProjects(currentProjects => currentProjects.map(project => (
      project.id === updatedProject.id ? updatedProject : project
    )))
  }

  const handleDelete = (projectId) => {
    fetch(`http://localhost:4000/projects/${projectId}`, {method: "DELETE"})
    .then(() => {
      setProjects(currentProjects => currentProjects.filter(project => project.id !== projectId))
    })
    .then(() => navigate("/projects"))
  }

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  const setEditingModeId = useCallback((projectId) => {
    setEditModeProjectId(projectId);
  }, [setEditModeProjectId]);

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      {/* <ProjectForm handleAddProject={handleAddProject} editModeProjectId={editModeProjectId} handlePatchProject={handlePatchProject} setEditingModeId={setEditingModeId} /> */}
      {/* <ButtonsFilter handlePhaseSelection={handlePhaseSelection}/> */}
      {/* <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} /> */}
      {/* <ProjectList projects={projects} searchQuery={searchQuery} phaseSelected={phaseSelected} setEditingModeId={setEditingModeId} handleDelete={handleDelete} /> */}
      <Outlet context={{projects, searchQuery,phaseSelected, handlePhaseSelection, handleSearch, setEditingModeId, handleDelete, URL, editModeProjectId, handleAddProject, handlePatchProject}}/>
      <Footer />
    </div>
  );
};

export default App;
