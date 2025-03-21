import { useRouter } from "@router";
import { Header } from "../components/Header";

export default function TestIdPage() {
  const { params } = useRouter();
  return (
    <div>
      <header>
        <h1>
          Test ID {"-> "} {params?.id}
        </h1>

        <Header />
      </header>
    </div>
  );
}
