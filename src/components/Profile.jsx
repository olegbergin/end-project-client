import { useState } from "react";

export const Profile = () => {
  const [status, setStatus] = useState("לא נמצא");

  console.log(status);
  return (
    <div className="flex j flex-col items-center mt-10">
      <h1 className="text-3xl font-semibold">הפרופיל שלי</h1>
      <div className="mt-10 flex flex-col items-center">
        <img
          src="https://pps.whatsapp.net/v/t61.24694-24/215742736_169130348833804_5618789588749101516_n.jpg?ccb=11-4&oh=01_AdSC1WCVuXHYd2xh_nnwFPNIXNjqdpTvwP8dIfcHPj8IBw&oe=6379D759"
          className="w-28 rounded-full border-2 border-gray-900"
          alt=""
        />
        <ul className="list-none mt-10 text-center">
          <li>נעם מרי</li>
          <li>050-264-8712</li>
          <li>noammery55@gmail.com</li>
          <li>אגף: </li>
          <li>01.02.2001</li>
        </ul>
        <div className="mt-5 text-center">
          <h1 className="font-semibold text-xl mb-5"> סטטוס: {status}</h1>
          <select
            name=""
            id=""
            onChange={(e) => e.target.value && setStatus(e.target.value)}
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
