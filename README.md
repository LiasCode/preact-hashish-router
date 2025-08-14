# Preact Hashish Router

## Features

- `hash` and `browser` routing types.
- Support for lazy-loaded routes (`lazy` loading).
- Error handling integration with `ErrorRoute`.
- Fully typed.
- Ultra lightweight.
- Minimal external dependencies.

## Installation

```bash
npm install preact-hashish-router@latest
```

## Usage

### Context Setup

First, ensure your application is wrapped within the router context. This will allow you to access routes and related functions.

```tsx
import { Route, Router, RouterErrorBoundary } from "preact-hashish-router";
import AboutPage from "./routes/About";
import HomePage from "./routes/Home";
import ProductPage from "./routes/Product";

export default function App() {
  return (
    // or hash for hash-based routing
    <RouterErrorBoundary>
      <Router type="browser">
        <Route path="/">
          <HomePage />
        </Route>

        <Route path="/about">
          <AboutPage />
        </Route>

        <Route path="/product/:id">
          <ProductPage />
        </Route>
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
