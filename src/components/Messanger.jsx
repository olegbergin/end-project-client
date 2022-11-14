import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const Messanger = (props) => {
  const userName = useSelector((state) => state.user.fullname);
  console.log(userName);
  const [arrow, setArrow] = useState(false);
  const [inputValue, setInputValue] = useState();
  const { socket, messageList } = props;
  const [message, setMessage] = useState("");
  const endMessage = useRef(null);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      const sentMessage = {
        name: userName,
        message: message,
      };
      socket.emit("send", sentMessage);
      await setInputValue("");
      setInputValue();
    }
  };

  useEffect(() => {
    endMessage.current?.scrollIntoView();
  }, [messageList]);

  return (
    userName && (
      <div>
        {!arrow && (
          <div className="bg-gray-700 border-2 border-black m-2 bottom-0 p-1  rounded-md right-0 fixed flex justify-center items-center z-50">
            <h1
              className="text-center text-white font-semibold cursor-pointer"
              onClick={() => {
                setArrow(true);
              }}
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
                  return message.name === userName ? (
                    <div
                      key={index}
                      className="w-80 inline-flex justify-start break-all"
                    >
                      <div className="bg-indigo-800 px-3 rounded-lg mt-2 ml-2">
                        <p className="text-md italic text-white/80">אתה</p>
                        <h1 className="text-lg text-white/80">
                          {message.message}
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="w-80 inline-flex justify-end break-all"
                    >
                      <div className="bg-white px-3 rounded-lg mt-2 ml-2">
                        <p className="text-md italic">{message.name}</p>
                        <h1 className="text-lg">{message.message}</h1>
                      </div>
                    </div>
                  );
                })}
                <div ref={endMessage}></div>
              </div>
            </div>
            <form action="" onSubmit={HandleSubmit}>
              <button
                type="submit"
                className="w-14 bg-blue-900 text-white border-l-2 border-l-black"
              >
                שלח
              </button>
              <input
                value={inputValue}
                type="text"
                className="w-64 bg-gray-400"
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    )
  );
};
