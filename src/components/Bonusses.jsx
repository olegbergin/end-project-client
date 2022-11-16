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
    <div className="space-y-4 border w-22 border-r-8 mt-24">
      <div className="pt-6 text-center space-y-4 text-xl text-decoration-line: underline">
        הטבות לעובדי העירייה
      </div>
      <p className="w-2/3">
        אמנם היצע מגוון ההטבות המוענק לעובדים שלנו ידוע ומוערך בשוק בעבודה אבל
        בכל זאת החלטנו לתת לכם טעימה משלל הביטוחים, הפעילויות המשפחתיות, יוזמות
        התרבות והפנאי, שירותי הרווחה וההטבות השונות שיש אצלנו. הטוב הזה ברובו
        עוטף לא רק את עובדי החברה אלא גם את בני משפחותיהם, כי כאלה אנחנו.
      </p>
      <div className="flex flex-wrap w-screen justify-center">
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
              <div class="max-w-sm rounded overflow-hidden shadow-lg mx-10 h-2/3 my-5">
                <img
                  class="lg:h-56  min-w-full object-fill"
                  src={image}
                  alt="Sunset in the mountains"
                />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{title}</div>
                  <p class="text-gray-700 text-base">{description}</p>
                </div>
                <div class="px-6 pt-4 pb-2 text-center">
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
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
