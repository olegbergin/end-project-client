import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";

export const Messanger = (props) => {
  const userName = useSelector((state) => state.user.fullname);
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
          <div className="bg-gray-800 shadow-lg shadow-black/80  m-2 bottom-0 p-2  rounded-full right-0 fixed flex justify-center items-center z-50 ">
            <AiOutlineUp
              className="text-center text-white font-semibold cursor-pointer text-2xl"
              onClick={() => {
                setArrow(true);
              }}
            />
          </div>
        )}
        {arrow && (
          <div className="w-80 h-96 bottom-0 right-0 fixed  shadow-lg shadow-black  bg-gray-200 z-40 flex flex-col justify-between items-center rounded-3xl mr-3 mb-3">
            <div className="flex items-center justify-between w-full bg-gray-800 p-3  rounded-t-3xl">
              <AiOutlineDown
                onClick={() => setArrow(false)}
                className="mr-4 text-white text-2xl "
              />
              <h1 className="ml-4 text-white">סגור צא'ט</h1>
            </div>
            <div>
              <div className="w-80 h-72  overflow-scroll scrollbar-hide">
                {messageList.map((message, index) => {
                  return message.name === userName ? (
                    <div
                      key={index}
                      className="w-80 inline-flex justify-start break-all"
                    >
                      <div className=" mr-2">
                        <p className="text-sm italic font-bold">אתה</p>
                        <h1 className="text-lg tracking-wide bg-white px-5 py-2 rounded-lg ml-2 ">
                          {message.message}
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="w-80 inline-flex justify-end break-all"
                    >
                      <div className="ml-2">
                        <p className="text-sm italic font-bold">
                          {message.name}
                        </p>
                        <h1 className="text-lg tracking-wide bg-gray-500 px-5 py-2 rounded-lg mr-2 ">
                          {message.message}
                        </h1>
                      </div>
                    </div>
                  );
                })}
                <div ref={endMessage}></div>
              </div>
            </div>
            <form
              action=""
              className="w-full h-full rounded-b-2xl flex items-center justify-center border-t-2 border-gray-500"
              onSubmit={HandleSubmit}
            >
              <AiOutlineSend type="submit" />
              <input
                value={inputValue}
                type="text"
                placeholder="רשום הודעה"
                className=" bg-gray-200 outline-0 w-72 placeholder:pr-4 pr-4"
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    )
  );
};
