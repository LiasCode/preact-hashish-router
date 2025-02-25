import { Redirect } from "@router";

export default function RedirectPage() {
  return (
    <div>
      <header>
        <h1>Redirecting</h1>
      </header>

      <Redirect to="/" />
    </div>
  );
}
