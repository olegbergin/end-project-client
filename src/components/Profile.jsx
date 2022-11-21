import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { BsFillPhoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";

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
  const email = useSelector((state) => state.user.email);
  const day = new Date(theUser?.birthday).getDate();
  const month = new Date(theUser?.birthday).getMonth();
  const theBirthday = `${day},${month}`;
  const updatedBirthday = `${day} ב${monthNames[month]}`;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const Today = `${new Date().getDate()},${new Date().getMonth()}`;
    Today === theBirthday ? setShow(true) : setShow(false);
  }, [show, theBirthday]);
  const setTheStatus = async (e) => {
    const requestObj = {
      email: email,
      status: e,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER}/auth/status`, requestObj)
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/auth/findUser`, { email: email })
      .then((res) => setTheUser(res.data));
  }, [email, status]);

  return (
    <section className="pt-16 min-h-screen flex items-center bg-gray-200">
      <div className="w-full  px-4 m-auto ">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center items-center">
              <div className="w-full px-4 flex justify-center pt-5">
                <img
                  alt="..."
                  src={theUser?.image}
                  className="w-44 h-44 shadow-xl rounded-full relative"
                />
              </div>
            </div>
            <div className="text-center mt-3 ">
              <h3 className="text-3xl font-semibold leading-normal">
                ברוך הבא: {theUser?.fullname}
              </h3>
              <div className="text-xl leading-normal mb-2 font-bold">
                אגף: {theUser?.department}
              </div>
              <div className=" w-full mt-5 flex flex-col items-center">
                <div>
                  <div className="mb-1  mx-3 p-2 rounded-lg font-semibold">
                    <h1 className="flex items-center text-xl">
                      <MdEmail className="mt-1" />: {theUser?.email}
                    </h1>
                  </div>
                  <div className="mb-1  mx-3 p-2 rounded-lg font-semibold">
                    <span className="flex items-center text-xl">
                      <BsFillPhoneFill />:{" "}
                      <span dir="ltr" className="mx-1">
                        {theUser?.phone}
                      </span>
                    </span>
                  </div>
                  <div className="mb-1  mx-3 p-2 rounded-lg font-semibold">
                    <span className="flex items-center text-xl">
                      <FaBirthdayCake /> : {updatedBirthday}
                    </span>
                  </div>
                  <div className="mb-1  mx-3 p-2 rounded-lg font-semibold">
                    <a
                      className="flex items-center text-xl"
                      href={theUser?.contract}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFileContract /> : חוזה העסקה
                    </a>
                  </div>
                  {show && (
                    <div className="mb-1  mx-3 p-2 rounded-lg font-bold text-pink-500 text-6xl">
                      מזל טוב {theUser?.fullname}!
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10 py-10 border-t  text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <span className="font-semibold text-2xl mb-5">
                    סטטוס נוכחי:{" "}
                  </span>
                  <span
                    className={
                      theUser?.status === "לא נמצא"
                        ? "font-semibold text-2xl mb-5 text-red-500"
                        : theUser?.status === "בעבודה"
                        ? "font-semibold text-2xl mb-5 text-green-700"
                        : "font-semibold text-2xl mb-5 "
                    }
                  >
                    {theUser?.status}
                  </span>
                  <br />
                  <select
                    name=""
                    id=""
                    onChange={async (e) => {
                      e.target.value && setStatus(e.target.value);
                      setTheStatus(e.target.value);
                    }}
                    className="text-2xl font-bold mt-5"
                  >
                    <option value="">שנה סטטוס</option>
                    <option value="בעבודה">בעבודה</option>
                    <option value="בחופשה">בחופשה</option>
                    <option value="מחלה">מחלה</option>
                    <option value="לא נמצא">לא נמצא</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
