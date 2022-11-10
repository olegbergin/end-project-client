import React from "react";

function Department() {
  return (
    <div>
      <div className="text-5xl flex justify-center bg-amber-400 h-14">
        <h1>שם אגף</h1>
      </div>
      <div className="flex justify-center ">
        <div className="text-xl flex justify-items-center justify-center flex-wrap w-5/6 flex-col ">
          <div className=" mr-64 bg-blue-400 w-1/6 text-center">
            <h1>כותרת לכתבה</h1>
          </div>
          <div className="mr-4 border-2 border-green-500">
            <p>
              פוסט עם מלא תיאור ומילים ומשפטים ושטויות ויופע בו גם תאריך ונוסיף תמונה
            </p>
          </div>
        </div>
        <div className="flex justify-items-center justify-center w-1/6 border-2 border-black">
          <ul>
            <li>
              שם מלא + תמונה
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Department;
