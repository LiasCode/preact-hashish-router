import { useParams } from "@router";
import { Header } from "../components/Header";

export default function RestTestPage() {
  const { _: rest } = useParams();

  return (
    <div>
      <header>
        <h1>
          Rest of /rest/** {"-> "} {rest}
        </h1>

        <Header />
      </header>
    </div>
  );
}
