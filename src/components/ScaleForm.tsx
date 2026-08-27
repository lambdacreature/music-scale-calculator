
export const ScaleForm = () => {
  return (
    <form className="flex flex-col gap-2 pt-4">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <span>Root</span>
          <input className="max-w-lg" type="text" placeholder="Root" />
        </div>
        <div className="flex flex-col grow">
          <span>Scale</span>
          <input type="text" placeholder="Scale" />
        </div>
      </div>
      <button className="self-center">Add Scale</button>
    </form>
  );
};
