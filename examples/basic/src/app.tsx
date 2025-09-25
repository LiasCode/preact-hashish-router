import { NotFound, Route, Router, RouterErrorBoundary } from "preact-hashish-router";
import { lazy } from "preact/compat";
import { AllLevelWildcard } from "./routes/AllLevelWildcard";
import { Home } from "./routes/Home";
import { OneLevelWildcard } from "./routes/OneLevelWildcard";
import { ProductDetails } from "./routes/ProductDetails";

const AboutLazy = lazy(() => import("./routes/About"));

export function App() {
  return (
    <RouterErrorBoundary>
      <Router
        ignoreInitial
        onRouteDidChange={(url) => {
          console.log("onRouteDidChange", url);
        }}
        onBeforeRouteChange={(url) => {
          console.log("onBeforeRouteChange", url);
        }}
      >
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          lazy
          fallback={<h1>Loading About...</h1>}
          element={<AboutLazy />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/one-level-wildcard/*"
          element={<OneLevelWildcard />}
        />

        <Route
          path="/all-level-wildcard/**"
          element={<AllLevelWildcard />}
        />

        <NotFound element={<h1>Custom Not Found Element</h1>} />
      </Router>
    </RouterErrorBoundary>
  );
}
