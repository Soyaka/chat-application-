const ColorSwatches = ({ colors }: { colors: string[] }) => {
  return (
    <div className="flex flex-row">
      {colors.map((color, index) => (
        <span key={index} className={`bg-${color}-300 rounded-xl h-2 w-2 min-w-2 min-h-2`}></span>
      ))}
    </div>
  );
};

export default function MsgRoom() {
  const Timer: Date = new Date();
  return (
    <div className="w-[70%] h-screen flex flex-col shadow-xl relative bg-indigo-950 rounded-md">
      <div className="w-[100%] flex items-center justify-center h-8 bg-slate-400">
        {Timer.toDateString()}
      </div>
      <div className="bg-emerald-600 relative w-fit flex flex-col max-w-[70%] h-fit max-h-[70%] p-2 ml-2 rounded-xl my-2">
        <span className="text-orange-600 text-xs">user1</span>
        <p>Hello guys</p>
        <ColorSwatches colors={["red", "green", "yellow"]} />
      </div>
    </div>
  );
}
