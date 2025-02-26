import { useRouter } from "@router";
import { Header } from "../components/Header";

export default function HomePage() {
  const { query } = useRouter();

  return (
    <div>
      <header>
        <h1>Home</h1>
        {query}
        <Header />
      </header>
    </div>
  );
}
