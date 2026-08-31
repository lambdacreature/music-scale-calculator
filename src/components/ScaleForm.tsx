import { useState, type ChangeEvent } from "react";
import type { ScaleDegree } from "../musicPrimitives";

type ScaleFormProps = {
  setRoot:  React.Dispatch<React.SetStateAction<string>>;
  setScale: React.Dispatch<React.SetStateAction<ScaleDegree[]>>;
};

export const ScaleForm = ({ setRoot, setScale }: ScaleFormProps) => {
  const [ inputRoot, setInputRoot ] = useState("");
  const [ inputFormula, setInputFormula ] = useState("");
  const [ validRoot, setValidRoot ] = useState(false);
  const [ validFormula, setValidFormula ] = useState(false);

  const handleRootChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setInputRoot(e.target.value);
  };

  const handleFormulaChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setInputFormula(e.target.value);
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
      <CalculateButton disabled={!validRoot || !validFormula} />
    </form>
  );
};

type CalculateButtonProps = {
  disabled: boolean;
};

const CalculateButton = ({ disabled }: CalculateButtonProps) => {
  return (
    <button
      className="bg-violet-600 hover:bg-violet-500 transition-colors rounded-lg px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      Calculate
    </button>
  );
};
