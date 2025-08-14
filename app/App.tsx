import { Route, Router, RouterErrorBoundary } from "@router";
import "./index.css";
import AboutPage from "./routes/About";
import HomePage from "./routes/Home";
import RestTestPage from "./routes/RestTest";
import TestIdPage from "./routes/TestId";

export function App() {
  return (
    <RouterErrorBoundary>
      <Router type="browser">
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/test/:id"
          element={<TestIdPage />}
        />

        <Route
          path="/rest/**"
          element={<RestTestPage />}
        />
      </Router>
    </RouterErrorBoundary>
  );
}
