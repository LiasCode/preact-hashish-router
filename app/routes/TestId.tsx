import { useParams } from "../../src/context";
import { Header } from "../components/Header";

export default function TestIdPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <header>
        <h1>
          Test ID {"-> "} {id}
        </h1>
        <Header />
      </header>
    </div>
  );
}
