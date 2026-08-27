import { Header } from "./components/Header";
import { ScaleForm } from "./components/ScaleForm";
import { ScaleList } from "./components/ScaleList";

export default function App() {
  return (
    <div className="mx-auto max-w-2xl p-4 flex flex-col gap-4">
      <Header />
      <ScaleForm />
      <ScaleList />
    </div>
  );
}

