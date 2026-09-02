import { applyFormula, formatInterval, formatNote, type HarmonicVector, type ScaleDegree } from "../musicPrimitives";

type ResultProps = {
  root: HarmonicVector;
  formula: HarmonicVector[];
  renderResult: boolean;
};

export const Result = ({ root, formula, renderResult }: ResultProps) => {
  if (!renderResult) {
    return null;
  }

  const scale: ScaleDegree[] = applyFormula(root, formula).map((note, index) => ({
    degree: formatInterval(formula[index]),
    note: formatNote(note),
  }));

  return (
    <div className="flex flex-col items-center">
      <span className="text-xl self-start ps-4">Root: {formatNote(root)}</span>
      <div className="flex gap-4">
        {scale.map( scaleDegree => (
          <div 
            className="flex flex-col items-center bg-zinc-800 rounded-lg px-5 py-2"
          >
            <span>
              {scaleDegree.note}
            </span>
            <span>
              {scaleDegree.degree}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
