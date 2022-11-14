import { useState } from "react";

export const Messanger = (props) => {
  const [arrow, setArrow] = useState(false);
  const { socket, messageList } = props;
  const [message, setMessage] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("send", message);
    }
  };

  return (
    <div>
      {!arrow && (
        <div className="bg-gray-700 border-2 border-white bottom-0 w-14 h-14 rounded-full right-0 fixed flex justify-center items-center z-50">
          <h1
            className="text-center text-white font-semibold cursor-pointer"
            onClick={() => setArrow(true)}
          >
            פתח צא'ט
          </h1>
        </div>
      )}
      {arrow && (
        <div className="w-80 h-96 bottom-0 right-0 fixed border-t-2 border-l-2 border-white rounded-md bg-gray-700 z-40 flex flex-col justify-between items-center">
          <h1
            className="text-center text-gray-900 font-semibold cursor-pointer p-1 text-xs border-2 border-gray-900 rounded-xl mt-2 flex justify-center items-center"
            onClick={() => setArrow(false)}
          >
            סגור צא'ט
          </h1>
          <div>
            <div className="w-80 h-80 overflow-scroll scrollbar-hide">
              {messageList.map((message, index) => {
                return <h1 key={index}>{message}</h1>;
              })}
            </div>
          </div>
          <form action="" onSubmit={HandleSubmit}>
            <input
              type="text"
              className="w-64 bg-gray-400 rounded-xl"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="w-14">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
