import { useParams } from "preact-hashish-router";
import { Header } from "../layout/Header";
import "./Home.css";

export function AllLevelWildcard() {
  const params = useParams();

  console.log("AllLevelWildcard", params);

  return (
    <div>
      <Header />
      <h1>All Level Wildcard </h1>
      <p> {params._}</p>
    </div>
  );
}
