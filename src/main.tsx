import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import importMdxFilesIntoJsxComponentMap, {
  WrappedJsxComponentsDictionary,
} from "./util/import-mdx-files-into-jsx-component-map";
import { RouteObject } from "react-router/dist/lib/context";

// For some reason, can't import this.
type RemixRouter = ReturnType<typeof createBrowserRouter>;

function getChildrenRoutes(
  componentDictionary: WrappedJsxComponentsDictionary
): RouteObject[] {
  return Object.entries(componentDictionary).map(
    ([componentName, JsxComponent]): RouteObject => {
      const routeObject: RouteObject = {
        path: componentName,
        element: <JsxComponent />,
      };

      return routeObject;
    }
  );
}

function addMdxComponentsToRouter(
  componentDictionary: WrappedJsxComponentsDictionary
): RemixRouter {
  const children = getChildrenRoutes(componentDictionary);
  return createBrowserRouter([
    {
      path: "/",
      element: <App />, // should be root
      errorElement: <Error />,
      children,
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
