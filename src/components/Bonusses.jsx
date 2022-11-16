import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Bonusses = () => {
  const [bonuses, setBonuses] = useState();
  useEffect(() => {
    axios
      .post("http://localhost:5000/bonuses/get")
      .then((res) => setBonuses(res.data));
  }, []);

  return (
    <div>
      <div className="mt-32">
        <div className="text-center m-4 text-3xl font-bold text-blue-900">
          הטבות לעובדי העירייה
        </div>
        <p className="w-4/5 text-xl font-semibold pr-10">
          אמנם היצע מגוון ההטבות המוענק לעובדים שלנו ידוע ומוערך בשוק בעבודה אבל
          בכל זאת החלטנו לתת לכם טעימה משלל הביטוחים, הפעילויות המשפחתיות,
          יוזמות התרבות והפנאי, שירותי הרווחה וההטבות השונות שיש אצלנו. הטוב הזה
          ברובו עוטף לא רק את עובדי החברה אלא גם את בני משפחותיהם, כי כאלה
          אנחנו.
        </p>
      </div>
      <div className="flex flex-wrap w-screen justify-center mt-20">
        {bonuses?.map(
          ({
            _id,
            image,
            title,
            description,
            link,
            linktitle,
            date,
            isimage,
          }) => {
            return (
              <div className="max-w-sm rounded overflow-hidden shadow-lg mx-10 h-2/3 my-5">
                <img
                  className="lg:h-56  min-w-full object-fill"
                  src={image}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{title}</div>
                  <p className="text-gray-700 text-base">{description}</p>
                </div>
                <div className="px-6 pt-4 pb-2 text-center">
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    #{linktitle}
                  </a>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Bonusses;
