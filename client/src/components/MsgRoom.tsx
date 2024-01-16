import React, { useState } from "react";
import UsersPanel from "./UsersPanel";
import WebSocketComponent from "./WsComp";
export default function MsgRoom() {
  const histColor: string =
    localStorage.getItem("color_theme")?.trim() || "#063E58";
  const userName: string = localStorage.getItem("User-name") || "unknown";
  const [selectedColor, setSelectedColor] = useState<string>(histColor);
  const colors: string[] = ["#888993", "#677DB7", "#063E58"];

  // const [Message, setMessage] = useState<string>("")
  // const handleMsgSend= (e: React.FormEvent<HTMLFormElement>)=>{
  //   e.preventDefault()
  // }
  const handleClicked = (
    e: React.MouseEvent<HTMLButtonElement>,
    color: string
  ) => {
    e.preventDefault();
    localStorage.setItem("color_theme", color);
    setSelectedColor(color);
  };
  const GetfirstLetter = () => {
    return userName[0].toUpperCase();
  };
  return (
    <div
      className="relative shadow-md rounded-md flex flex-col  h-screen "
      style={{ backgroundColor: selectedColor }}
    >
      <div className="flex flex-row w-full items-center realtive h-14 bg-slate-500 shadow-xl">
        <div className="relative  flex rounded-xl shadow-sm w-10 h-10 left-2 m-2 bg-blue-800 justify-center items-center  text-center">
          <span className=" font-extrabold ">{GetfirstLetter()}</span>
        </div>
        <div className=" realtive flex  items-center justify-center space-x-3 left-10">
          <button className="ml-4 p-2 rounded-md bg-sky-800 text-slate-400 font-semibold hover:bg-sky-950 ">
            leave room
          </button>
          <button className="ml-4 p-2 rounded-md bg-sky-800 text-slate-400 font-semibold hover:bg-sky-950">
            clear history
          </button>
        </div>
        <div className="flex items-center ml-auto mr-1 space-x-2 bg-blue-600 w-14 h-6 p-2 rounded-xl shadow-xl">
          {colors.map((color) => (
            <button
              key={color}
              onClick={(e) => handleClicked(e, color)}
              className={` rounded-xl shadow-xl p-1`}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-row">
        <UsersPanel />
        <div className="flex flex-1 flex-col">
          <div className=" mt-4 mr-4 flex h-[82%] rounded  bg-red-400">
          <WebSocketComponent/>
          </div>
          {/* <form  onSubmit={(e)=>handleMsgSend(e)} className="p-2 m-6" action="">
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="set message"
              className=" relative left-[10%] bottom-6 w-[70%] rounded-xl p-2 opacity-40 "
            />
          </form> */}
        </div>
      </div>
    </div>
  );
}
