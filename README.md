# Preact Hashish Router

## Features

- `hash` and `browser` routing types.
- Support for lazy-loaded routes (`lazy` loading).
- Error handling integration with `ErrorRoute`.
- Fully typed.
- Ultra lightweight.
- No external dependencies.

## Installation

```bash
npm install preact-hashish-router@latest
```

## Usage

### Context Setup

First, ensure your application is wrapped within the router context. This will allow you to access routes and related functions.

```tsx
import { ErrorRoute, Route, Router, RouterErrorBoundary } from "preact-hashish-router";
import _404 from "./routes/404";
import AboutPage from "./routes/About";
import HomePage from "./routes/Home";

export default function App() {
  return (
    <Router type="hash">
      <RouterErrorBoundary>
        <Route path="/">
          <HomePage />
        </Route>

        <Route path="/about">
          <AboutPage />
        </Route>

        <ErrorRoute>
          <_404 />
        </ErrorRoute>
      </RouterErrorBoundary>
    </Router>
  );
}
```

### Using the `useRouter` Hook

The `useRouter` hook gives you access to the router context to programmatically navigate or retrieve information about the current route.

```tsx
import { useRouter } from "preact-hashish-router";

function HomePage() {
  const router = useRouter();

  function goToAbout() {
    router.go("/about");
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

### `<Redirect />` Component

```tsx
import { Redirect } from "preact-hashish-router";

export default function ProductPage() {
  return (
    <>
      <header>
        <nav>
          <A href="/">Home</A>
          <A href="/about">About</A>
        </nav>
      </header>
      <Redirect to="/" />
    </>
  );
}
```

## Development

If you have any improvements or find any issues, feel free to contribute or open an issue in the associated repository.
