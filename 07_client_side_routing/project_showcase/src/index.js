import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App";
import "./index.css"
import ErrorComponent from "./components/navigation/ErrorComponent";
import ButtonsFilter from "./components/search/ButtonsFilter";
import SearchBar from "./components/search/SearchBar";
import ProjectList from "./components/project/ProjectList";
import ProjectForm from "./components/project/ProjectForm";
import ProjectListItem from "./components/project/ProjectListItem";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/projects",
        element: <><ButtonsFilter /><SearchBar /><ProjectList /></>

      },
      {
        path: "/projects/new",
        element: <ProjectForm />

      },
      {
        path: "/projects/:projectId",
        element: <ProjectListItem />
      }
    ]
  }
])

root.render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>
);