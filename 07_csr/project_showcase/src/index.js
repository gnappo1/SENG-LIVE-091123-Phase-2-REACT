import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App";
import ProjectForm, { projectFormLoader } from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import ProjectListItem, { projectListItemLoader } from "./components/project/ProjectListItem";

import ErrorComponent from "./components/navigation/ErrorComponent";
import ButtonsFilter from "./components/search/ButtonsFilter";
import SearchBar from "./components/search/SearchBar";
import "./index.css"

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
        path: "projects/:projectId",
        element: <ProjectListItem />,
        loader: projectListItemLoader,
      },
      {
        path: "projects/:projectId/edit",
        element: <ProjectForm />,
        loader: projectFormLoader,
      }
    ]
  }
])

root.render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>
);