import { useState, type ChangeEvent } from "react";
import { matchFormula, matchNote, type HarmonicVector } from "../musicPrimitives";

type ScaleFormProps = {
  setRoot:  React.Dispatch<React.SetStateAction<HarmonicVector>>;
  setFormula:React.Dispatch<React.SetStateAction<HarmonicVector[]>>;
  setRenderResult: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ScaleForm = ({ setRoot, setFormula, setRenderResult }: ScaleFormProps) => {
  const [ inputRoot, setInputRoot ] = useState("");
  const [ inputFormula, setInputFormula ] = useState("");
  const [ validRoot, setValidRoot ] = useState(false);
  const [ validFormula, setValidFormula ] = useState(false);

  console.log("root", validRoot)
  console.log("formula", validFormula);

  const handleRootChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setInputRoot(e.target.value);
    try {
      const root = matchNote(e.target.value);
      setRoot(root);
      setValidRoot(true);
      setRenderResult(validFormula);
    } catch {
      setValidRoot(false);
      setRenderResult(false);
    }
  };

  const handleFormulaChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setInputFormula(e.target.value);
    try {
      const formula = matchFormula(e.target.value);
      setFormula(formula);
      setValidFormula(true);
      setRenderResult(validRoot);
    } catch {
      setValidFormula(false);
      setRenderResult(false);
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form 
      className="flex flex-col items-center gap-4 text-xl"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col self-stretch gap-1">
        <span className="text-xl">Root</span>
        <input 
          type="text" 
          placeholder="Type the root note..." 
          value={inputRoot}
          onChange={handleRootChange}
          className="self-stretch rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />
      </div>
      <div className="flex flex-col self-stretch gap-1">
        <span>Scale</span>
        <input 
          type="text" 
          placeholder="Type in some scale..."
          value={inputFormula}
          onChange={handleFormulaChange}
          className="self-stretch rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />
      </div>
    </form>
  );
};
