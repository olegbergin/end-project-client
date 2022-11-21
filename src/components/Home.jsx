import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Calendar from "./Calendar";

export const Home = () => {
  const [events, setEvents] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/departments/data`, {
        department: "ראשי",
      })
      .then((res) => setEvents(res.data));
  }, []);

  const usersBirth = [];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/auth/users`, usersBirth)
      .then((res) => console.log(res.data));
  }, []);
  
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="pt-28 w-screen">
        <h1 className="text-4xl font-bold text-center  ">אירועים אחרונים</h1>
        <div className="p-10">
        <div className="w-screen  flex flex-col items-center">
          <button onClick={handleOpen}>הצג</button>
          {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button>Menu 1</button>
          </li>
          <li className="menu-item">
            <button>Menu 2</button>
          </li>
        </ul>
      ) : null}
          {open ? <div>חוגגים החודש</div> : <div>חוגגים החודש</div>}
        </div>
          {events?.map((post, index) => {
            return (
              <div
                key={index}
                className="lg:flex-row md:flex-row sm:flex-row my-10 flex flex-col items-center  bg-white p-2 border-2 border-gray-700 rounded-lg"
              >
                <img src={post.image} alt="" className="w-56 mb-5" />
                <div className="flex flex-col pr-10 space-y-3 justify-center">
                  <h1 className="text-xl font-bold">{post.title}</h1>
                  <h1 className="text-lg font-semibold w-5/6">
                    {post.description}
                  </h1>
                  <h1 className="text-xs text-black/60 ">{post.date}</h1>
                </div>
              </div>
            );
          })}
        </div>
        <></>
        <Calendar />
      </div>
    </div>
  );
};
