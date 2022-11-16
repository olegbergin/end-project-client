import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";

export const PropsProfile = () => {
  const monthNames = [
    "ינואר",
    "פבואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];
  const location = useLocation();
  const email = location.state.email;
  const [theUser, setTheUser] = useState();
  const day = new Date(theUser?.birthday).getDate();
  const month = new Date(theUser?.birthday).getMonth();
  const updatedBirthday = `${day} ב${monthNames[month]}`;

  useEffect(() => {
    axios
      .post("http://localhost:5000/auth/findUser", {
        email: email,
      })
      .then((res) => setTheUser(res.data));
  }, [email]);
  return (
    <div className="flex j flex-col items-center mt-32">
      <div className="mt-2 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-10">{theUser?.fullname}</h1>
        <img
          src={theUser?.image}
          className="w-32 rounded-md border-2 border-gray-900 mb-2"
          alt=""
        />
        <div className="mt-10 md:flex lg:flex sm:flex">
          <div className="shadow-black/30 shadow-md m-2 p-2 rounded-lg font-bold text-gray-700">
            מס' טלפון: {theUser?.phone}
          </div>
          <div className="shadow-black/30 shadow-md m-2 p-2 rounded-lg font-bold text-gray-700">
            אימייל: {theUser?.email}
          </div>
          <div className="shadow-black/30 shadow-md m-2 p-2 rounded-lg font-bold text-gray-700">
            אגף: {theUser?.department}
          </div>
          <div className="shadow-black/30 shadow-md m-2 p-2 rounded-lg font-bold text-gray-700">
            יום הולדת:{updatedBirthday}
          </div>
        </div>
        <div className="mt-5 text-center">
          <span className="font-semibold text-xl mb-5">סטטוס: </span>
          <span
            className={
              theUser?.status === "לא נמצא"
                ? "font-semibold text-xl mb-5 text-red-500"
                : theUser?.status === "בעבודה"
                ? "font-semibold text-xl mb-5 text-green-700"
                : "font-semibold text-xl mb-5 "
            }
          >
            {theUser?.status}
          </span>
          <br />
        </div>
      </div>
    </div>
  );
};
