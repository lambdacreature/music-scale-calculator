import type { ScaleDegree } from "../musicPrimitives";

type ResultProps = {
  root: string;
  scale: ScaleDegree[];
};

export const Result = ({ root, scale }: ResultProps) => {
  if (scale.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-xl self-start ps-4">Root: {root}</span>
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
