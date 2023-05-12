import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import importMdxFilesIntoJsxComponentMap from "./util/import-mdx-files-into-jsx-component-map";
import { getApplicationRouter, RemixRouter } from "./routes";

function renderRoot(router: RemixRouter) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

importMdxFilesIntoJsxComponentMap().then((componentDictionary) => {
  renderRoot(getApplicationRouter(componentDictionary));
});
