import { createDataRouter, NotFound, RouterErrorBoundary } from "preact-hashish-router";
import { lazy } from "preact/compat";
import { AllLevelWildcard } from "./routes/AllLevelWildcard";
import { Home } from "./routes/Home";
import { OneLevelWildcard } from "./routes/OneLevelWildcard";
import { ProductDetails } from "./routes/ProductDetails";

const AboutLazy = lazy(() => import("./routes/About"));

const DataRouter = createDataRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "about",
        lazy: true,
        fallback: <h1>Loading About...</h1>,
        element: <AboutLazy />,
        children: [
          {
            path: "test/hola",
            element: <h1>About/test</h1>,
          },
        ],
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "one-level-wildcard/*",
        element: <OneLevelWildcard />,
      },
      {
        path: "all-level-wildcard/**",
        element: <AllLevelWildcard />,
      },
    ],
  },
]);

export function App() {
  return (
    <RouterErrorBoundary>
      <DataRouter
        onRouteDidChange={(url) => {
          console.log("onRouteDidChange", url);
        }}
        onBeforeRouteChange={(url) => {
          console.log("onBeforeRouteChange", url);
        }}
      >
        <NotFound element={<h1>Custom Not Found Element</h1>} />
      </DataRouter>
    </RouterErrorBoundary>
  );
}
