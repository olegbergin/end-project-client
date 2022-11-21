import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Bonusses = () => {
  const [bonuses, setBonuses] = useState();
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/bonuses/get`)
      .then((res) => setBonuses(res.data));
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="pt-32  text-center">
        <h1 className="text-3xl font-bold text-black mb-10">הטבות</h1>
        <p className="text-black">
          ברוכים הבאים לאזור ההטבות. בעמוד זה יפורטו ההטבות אשר מגיעות לכם/ן
          ופירוטן.
        </p>
      </div>
      <div className="flex flex-wrap w-screen justify-center mt-20">
        {bonuses?.map(({ _id, image, title, description, link, linktitle }) => {
          return (
            <div
              className="max-w-sm rounded-lg shadow-black/50 overflow-hidden shadow-lg mx-10 h-2/3 my-5 bg-white "
              key={_id}
            >
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
        })}
      </div>
    </div>
  );
};

export default Bonusses;
