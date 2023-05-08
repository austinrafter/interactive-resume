import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import importMdxFilesIntoJsxComponentMap, {
  WrappedJsxComponentsDictionary,
} from "./util/import-mdx-files-into-jsx-component-map";

// For some reason, can't import this.
type RemixRouter = ReturnType<typeof createBrowserRouter>;

function addMdxComponentsToRouter(
  componentDictionary: WrappedJsxComponentsDictionary
): RemixRouter {
  return createBrowserRouter([
    {
      path: "/",
      element: <App />, // should be root
      errorElement: <Error />,
      children: [],
    },
  ]);
}

function renderRoot(router: RemixRouter) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

importMdxFilesIntoJsxComponentMap().then((componentDictionary) => {
  const router = addMdxComponentsToRouter(componentDictionary);
  renderRoot(router);
});
