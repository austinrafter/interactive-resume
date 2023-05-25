import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ImportError from "../test/mock/error.mdx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import importMdxFilesIntoJsxComponentMap, {
  WrappedJsxComponentsDictionary,
} from "./util/import-mdx-files-into-jsx-component-map";
import { RouteObject } from "react-router/dist/lib/context";
import SubpageLink from "./components/subpage-link/subpage-link";
import { Component } from "mdx/types";

// For some reason, can't import this.
type RemixRouter = ReturnType<typeof createHashRouter>;

function getChildrenRoutes(
  componentDictionary: WrappedJsxComponentsDictionary
): RouteObject[] {
  return Object.entries(componentDictionary).map(
    ([componentName, JsxComponent]: [
      string,
      Component<React.ReactNode>
    ]): RouteObject => {
      const routeObject: RouteObject = {
        path: componentName,
        element: (
          <SubpageLink>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <JsxComponent />
          </SubpageLink>
        ),
      };

      return routeObject;
    }
  );
}

function addMdxComponentsToRouter(
  componentDictionary: WrappedJsxComponentsDictionary
): RemixRouter {
  const children = getChildrenRoutes(componentDictionary);

  return createHashRouter(
    [
      {
        path: "/",
        element: <App />, // should be root
        errorElement: <ImportError />,
        children,
      },
    ],
    {
      basename: "/",
    }
  );
}

function renderRoot(router: RemixRouter) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

importMdxFilesIntoJsxComponentMap().then((componentDictionary) => {
  const router = addMdxComponentsToRouter(
    componentDictionary as unknown as WrappedJsxComponentsDictionary
  );
  renderRoot(router);
});
