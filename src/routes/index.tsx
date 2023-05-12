// For some reason, can't import this.
import { createBrowserRouter } from "react-router-dom";
import { WrappedJsxComponentsDictionary } from "../util/import-mdx-files-into-jsx-component-map";
import { RouteObject } from "react-router/dist/lib/context";
import SubpageLink from "../components/subpage-link";
import App from "../App";
import ImportError from "../../test/mock/error.mdx";
import React from "react";
import { AiManagementConsole } from "../components/ai-console/ai-management-console";

export type RemixRouter = ReturnType<typeof createBrowserRouter>;

function getChildrenRoutes(
  componentDictionary: WrappedJsxComponentsDictionary
): RouteObject[] {
  return Object.entries(componentDictionary).map(
    ([componentName, JsxComponent]): RouteObject => {
      const routeObject: RouteObject = {
        path: componentName,
        element: (
          <SubpageLink>
            <JsxComponent />
          </SubpageLink>
        ),
      };

      return routeObject;
    }
  );
}

// @TODO - Make the <Header/> and <Footer /> components part of a master page so that "/" and "/ai" turn into
//         sub-pages of the website. This way, the <Footer /> won't dissappear when the user moves from the "/" page
//         to the "/ai" page.
export function getApplicationRouter(
  componentDictionary: WrappedJsxComponentsDictionary
): RemixRouter {
  const children = getChildrenRoutes(componentDictionary);
  return createBrowserRouter([
    {
      path: "/",
      element: <App />, // should be root
      errorElement: <ImportError />,
      children,
    },
    {
      path: "/ai",
      element: <AiManagementConsole />,
    },
  ]);
}
