import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

export const Profile = () => {
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
  const [theUser, setTheUser] = useState();
  const [status, setStatus] = useState("לא נמצא");
  const fullname = useSelector((state) => state.user.fullname);
  const day = new Date(theUser?.birthday).getDate();
  const month = new Date(theUser?.birthday).getMonth();
  const updatedBirthday = `${day} ב${monthNames[month]}`;

  // updatedBirthday = updatedBirthday.toUTCString();

  const setTheStatus = async (e) => {
    await setStatus(e);
    const requestObj = {
      fullname: fullname,
      status: e,
    };
    axios
      .post("http://localhost:5000/auth/status", requestObj)
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/auth/findUser", { fullname: fullname })
      .then((res) => setTheUser(res.data));
  }, []);

  return (
    <div className="flex j flex-col items-center mt-32">
      <h1 className="text-3xl font-semibold">הפרופיל שלי</h1>
      <div className="mt-10 flex flex-col items-center">
        <img
          src={theUser?.image}
          className="w-28 rounded-full border-2 border-gray-900"
          alt=""
        />
        <ul className="list-none mt-10 text-center">
          <li>שם: {theUser?.fullname}</li>
          <li>מס' טלפון: {theUser?.phone}</li>
          <li>אימייל: {theUser?.email}</li>
          <li>אגף: {theUser?.department}</li>
          <li>יום הולדת: {updatedBirthday}</li>
        </ul>
        <div className="mt-5 text-center">
          <h1 className="font-semibold text-xl mb-5">
            סטטוס: {theUser?.status}
          </h1>
          <select
            name=""
            id=""
            onChange={async (e) => {
              e.target.value && setTheStatus(e.target.value);
            }}
          >
            <option value="">שנה סטטוס</option>
            <option value="בעבודה">בעבודה</option>
            <option value="בחופשה">בחופשה</option>
            <option value="מחלה">מחלה</option>
          </select>
        </div>
      </div>
    </div>
  );
};
