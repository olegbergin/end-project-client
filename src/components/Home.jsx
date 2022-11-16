import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Calendar from "./Calendar";

export const Home = () => {
  const [events, setEvents] = useState();
  useEffect(() => {
    axios
      .post("http://localhost:5000/departments/data", { department: "ראשי" })
      .then((res) => setEvents(res.data));
  }, []);
  return (
    <div>
      <div className="mt-28 w-screen">
        <h1 className="text-4xl font-bold text-center text-blue-900 ">
          אירועים אחרונים
        </h1>
        <div className="p-10">
          {events?.map((event, index) => {
            return (
              <div
                key={index}
                className="lg:flex-row md:flex-row sm:flex-row my-10 flex flex-col items-center "
              >
                <img src={event.image} alt="" className="w-56 mb-5" />
                <div className="flex flex-col pr-10 space-y-3 justify-center">
                  <h1 className="text-xl font-bold">{event.title}</h1>
                  <h1 className="text-lg font-semibold w-5/6">
                    {event.description}
                  </h1>
                  <h1 className="text-xs text-black/60 ">{event.date}</h1>
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
