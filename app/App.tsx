import { ErrorRoute, Route, Router, RouterErrorBoundary } from "@router";
import "./index.css";
import _404 from "./routes/404";
import AboutPage from "./routes/About";
import HomePage from "./routes/Home";
import TestIdPage from "./routes/TestId";

export function App() {
  return (
    <Router type="hash">
      <RouterErrorBoundary>
        <Route path="/">
          <HomePage />
        </Route>

        <Route path="/about">
          <AboutPage />
        </Route>

        <Route path="/test/:id">
          <TestIdPage />
        </Route>

        <ErrorRoute>
          <_404 />
        </ErrorRoute>
      </RouterErrorBoundary>
    </Router>
  );
}
