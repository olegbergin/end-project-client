import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Calendar from "./Calendar";



export const Home = () => {
  const [events, setEvents] = useState();
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/departments/data`, { department: "ראשי" })
      .then((res) => setEvents(res.data));
  }, []);
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="pt-28 w-screen">
        <h1 className="text-4xl font-bold text-center  ">אירועים אחרונים</h1>
        <div className="p-10">
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
        <Calendar />
      </div>
    </div>
  );
};
