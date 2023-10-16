import { Link } from "react-router-dom";

const Header = ({isDarkMode, onToggleDarkMode}) => {
  return (
    <header>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      <Link to="/projects"><button>Projects</button></Link>
      <Link to="/projects/new"><button>New Project</button></Link>
      <button onClick={onToggleDarkMode}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button>
    </header>
  );
}

export default Header;