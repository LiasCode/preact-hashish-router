# Preact Hashish Router

## Features

- `browser` and `hash` routing types.
- Support for lazy-loaded routes (`lazy` loading).
- Error handling integration with `ErrorRoute`.
- Fully typed.
- Ultra lightweight.
- Minimal external dependencies.
- Super fast route matching using [unjs/rou3](https://github.com/h3js/rou3)

## Installation

```bash
npm install preact-hashish-router@latest
```

## Usage

### Context Setup

First, ensure your application is wrapped within the router context. This will allow you to access routes and related functions.

```tsx
import { NotFound, Route, Router, RouterErrorBoundary } from "preact-hashish-router";
import { About } from "./routes/About";
import { AllLevelWildcard } from "./routes/AllLevelWildcard";
import { Home } from "./routes/Home";
import { OneLevelWildcard } from "./routes/OneLevelWildcard";
import { ProductDetails } from "./routes/ProductDetails";

export function App() {
  return (
    <RouterErrorBoundary>
      <Router type="browser">
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
```

### Using the `useRouter` Hook

The `useRouter` hook gives you access to the router context to programmatically navigate or retrieve information about the current route.

```tsx
import { useRouter } from "preact-hashish-router";

function HomePage() {
  const { go, params, path, searchParams } = useRouter();

  function goToAbout() {
    go("/about");
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToAbout}>Go to About</button>
    </div>
  );
}
```

### `<A />` Component for Navigation

```tsx
import { A } from "preact-hashish-router";

export default function Header() {
  return (
    <header>
      <nav>
        <A href="/">Home</A>
        <A href="/about">About</A>
      </nav>
    </header>
  );
}
```

## Development

If you have any improvements or find any issues, feel free to contribute or open an issue in the associated repository.
