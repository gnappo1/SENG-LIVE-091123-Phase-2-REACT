import Header from "./navigation/Header";
import ProjectList from "./projects/ProjectList";

import {projects as data} from "./projects"

function App() {

  return (
    <div className="App">
      <Header />
      <ProjectList projects={data} />
    </div>
  );
}

export default App;
