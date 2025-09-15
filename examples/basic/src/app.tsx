import { NotFound, Route, Router, RouterErrorBoundary } from "preact-hashish-router";
import { About } from "./routes/About";
import { AllLevelWildcard } from "./routes/AllLevelWildcard";
import { Home } from "./routes/Home";
import { OneLevelWildcard } from "./routes/OneLevelWildcard";
import { ProductDetails } from "./routes/ProductDetails";

export function App() {
  return (
    <RouterErrorBoundary>
      <Router
        ignoreInitial
        onRouteDidChange={() => {
          console.log("onRouteDidChange");
        }}
        onBeforeRouteChange={() => {
          console.log("onBeforeRouteChange");
        }}
      >
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
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
