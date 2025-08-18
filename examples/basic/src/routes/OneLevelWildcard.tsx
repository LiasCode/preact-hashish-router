import { useParams } from "preact-hashish-router";
import { Header } from "../layout/Header";
import "./Home.css";

export function OneLevelWildcard() {
  const params = useParams();

  console.log("OneLevelWildcard", params);

  return (
    <div>
      <Header />
      <h1>One Level Wildcard </h1>
      <p> {params._0}</p>
    </div>
  );
}
