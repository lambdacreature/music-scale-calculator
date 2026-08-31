import { useState } from "react";
import { Header } from "./components/Header";
import { Result } from "./components/Result";
import { ScaleForm } from "./components/ScaleForm";
import type { ScaleDegree } from "./musicPrimitives";

export default function App() {
  const [ root, setRoot ] = useState("");
  const [ scale, setScale ] = useState<ScaleDegree[]>([]);


  return (
    <div className="mx-auto max-w-2xl p-4 flex flex-col gap-4">
      <Header />
      <ScaleForm setRoot={setRoot} setScale={setScale} />
      <Result root={root} scale={scale} />
    </div>
  );
}

