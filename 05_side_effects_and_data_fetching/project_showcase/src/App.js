import { useState, useEffect } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import SearchBar from "./components/search/SearchBar";
import ButtonsFilter from "./components/search/ButtonsFilter";
import Timer from "./components/timer/Timer";



const App = () => {
  //! LOCAL STATE
  //! the hook returns an array with ALWAYS two elements
  //! the ONLY WAY TO UPDATE the state variable is by using the state function
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  // IIFE
  
  const fetchDataPromise = () => {
    fetch(`http://localhost:4000/projects`)
    .then((res) => res.json())
    .then((projects) => setProjects(projects))
    .catch(err => alert(err))
  }

  const fetchDataAsync = async () => {
    console.log("d")
    try {
      const response = await fetch(`http://localhost:4000/projects`)
      console.log("e")
      const data = await response.json()
      setProjects(data);
    } catch (error) {
      alert(error)
    }
  }
  
  console.log("a")
  useEffect(() => {
    console.log("b")
    fetchDataAsync()
    console.log("c")
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

  const handleAddProject = (newProject) => {

    setProjects(currentProjectList => [newProject, ...currentProjectList]) //! new state derived based on current state
    setProjects([newProject, ...projects])
  }

  //! LOCAL NON-STATE VARIABLES DO NOT CAUSE RE-RENDERS
  // let count = 0

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  // loadProjects()
  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      {/* <Timer /> */}
      <ProjectForm handleAddProject={handleAddProject} />
      {/* <button className="load-btn" onClick={loadProjects}>Load Projects</button> */}
      <ButtonsFilter handlePhaseSelection={handlePhaseSelection}/>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <ProjectList projects={projects} searchQuery={searchQuery} phaseSelected={phaseSelected} />
    </div>
  );
};

export default App;
