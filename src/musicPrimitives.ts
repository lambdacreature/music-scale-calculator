export type ScaleDegree = {
  degree: string;
  note: string;
};

export type HarmonicVector = {
  diatonic: number;
  chromatic: number;
};

const noteRegex = new RegExp("^(C|D|E|F|G|A|B)(|b|bb|#|##)$");
export const matchNote = (candidate: string): HarmonicVector => {
  const matches = candidate.trim().match(noteRegex);

  if (matches === null) {
    throw new Error(`Invalid note "${candidate}"`);
  }

  const [ _, name, accidentals ] = matches;

  const diatonic = [
    "C", // 0 
    "D", // 1
    "E", // 2
    "F", // 3
    "G", // 4
    "A", // 5
    "B", // 6
  ].indexOf(name);

  const offset = accidentals.length * ( accidentals.indexOf("b") !== -1 ? -1 : 1);

  const chromatic = [
    0, 2, 4, 5, 7, 9, 11
  ][diatonic] + (offset);

  return { diatonic, chromatic };
}; 

export const formatNote = (vector: HarmonicVector): string => {
  const name = "CDEFGAB"[((vector.diatonic % 7) + 7) % 7];
  const offset = vector.chromatic - chromatize(vector.diatonic);
  const accidentals = (offset < 0 ? "b" : "#").repeat(Math.abs(offset));

  return name + accidentals;
};

const chromatize = (diatonic: number): number => {
  const diatonicOctave = Math.floor(diatonic / 7);
  const normalizedDiatonic = ((diatonic % 7) + 7) % 7;
  const normalizedChromatic = [ 0, 2, 4, 5, 7, 9, 11 ][normalizedDiatonic];

  return 12 * diatonicOctave + normalizedChromatic;
};

const intervalRegex = new RegExp("^(|-)(|b|bb|#|##)([1-9][0-9]*)$");
export const matchInterval = (candidate: string): HarmonicVector => {
  const matches = candidate.trim().match(intervalRegex);

  if (matches === null) {
    throw new Error(`Invalid interval "${candidate}"`);
  }

  const [ _, invertedSign, accidentals, intervalType ] = matches;

  const inversion = invertedSign === "-" ? -1 : 1;
  const offset = accidentals.length * ( accidentals.indexOf("b") !== -1 ? -1 : 1);
  const diatonic  = parseInt(intervalType)-1;
  const chromatic = chromatize(diatonic) + offset;

  return (
    { 
      diatonic: inversion * diatonic, 
      chromatic: inversion * chromatic 
    }
  );
};

export const formatInterval = (vector: HarmonicVector): string => {
  let diatonic = vector.diatonic;
  let chromatic = vector.chromatic;

  if (vector.diatonic < 0) {
    diatonic  *= -1;
    chromatic *= -1;
  }

  const intervalType = (diatonic+1).toString();
  const offset = chromatic - chromatize(diatonic);
  const accidentals = (offset < 0 ? "b" : "#").repeat(Math.abs(offset));

  return `${vector.diatonic < 0 ? "-" : ""}${accidentals}${intervalType}`;
};

export const matchFormula = (formula: string): HarmonicVector[] => {
  if (formula.trim().length === 0) {
    throw new Error("Empty formula");
  }
  console.log(formula);
  return formula.trim().split(/\s+/).map(matchInterval);
};

export const applyFormula = (root: HarmonicVector, formula: HarmonicVector[]): HarmonicVector[] => {
  return (
    formula.map(v => (
      { 
        diatonic:  v.diatonic  + root.diatonic,
        chromatic: v.chromatic + root.chromatic,
      }))
  );
}
