import { useParams } from "preact-hashish-router";
import { Header } from "../layout/Header";
import "./Home.css";

export function ProductDetails() {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <h1>Product Details Page</h1>
      <p>Product ID: {id}</p>
    </div>
  );
}
