import { useRouter } from "@router";
import { Header } from "../components/Header";

export default function RestTestPage() {
  const { rest } = useRouter();
  return (
    <div>
      <header>
        <h1>
          Rest of /rest/* {"-> "} {rest}
        </h1>

        <Header />
      </header>
    </div>
  );
}
