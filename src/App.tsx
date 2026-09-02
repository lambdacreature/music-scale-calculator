import { useState } from "react";
import { Header } from "./components/Header";
import { Result } from "./components/Result";
import { ScaleForm } from "./components/ScaleForm";
import type { HarmonicVector } from "./musicPrimitives";

export default function App() {
  const [ root, setRoot ] = useState<HarmonicVector>({diatonic: 0, chromatic: 0});
  const [ formula, setFormula ] = useState<HarmonicVector[]>([]);
  const [ renderResult, setRenderResult ] = useState(Boolean);


  return (
    <div className="mx-auto max-w-2xl p-4 flex flex-col gap-4">
      <Header />
      <ScaleForm setRoot={setRoot} setFormula={setFormula} setRenderResult={setRenderResult} />
      <Result root={root} formula={formula} renderResult={renderResult} />
    </div>
  );
}

