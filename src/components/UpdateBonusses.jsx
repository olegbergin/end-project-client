import React from "react";
import axios from "axios";
import { useState } from "react";
// import { useRef } from "react";
// import { useEffect } from "react";

const url = "http://localhost:5000/bonuses";

const UpdateBonusses = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [linktitle, setLinktitle] = useState("");
  const [date, setDate] = useState();
  const [deletebonus, setDeletebonus] = useState("");

  console.log(deletebonus);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${url}/update`, {
          title: title,
          description: description,
          image: image,
          link: link,
          linktitle: linktitle,
          date: date,
        })
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log("error!");
    }
    setTitle('')
    setDescription('')
    setImage('')
    setLink('')
    setLinktitle('')
  };

  const handledelete = async (elemant) => {
    elemant.preventDefault();
    try {
      await axios
        .delete(`http://localhost:5000/bonuses/delete/${deletebonus}`)
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log("error!!!!");
    }
    setDeletebonus('')
  };

  return (
    <div className="bg-gray-200">
      <div className="py-12 flex justify-center w-5/6 m-auto">
        <div className="w-screen max-w-xl xl:px-8 ">
          <div className="relative bg-white rounded shadow-2x1 p-7 sm:p-10 mt-24">
            <h1 className="text-center text-3xl font-bold mb-5">
              הוסף הטבה לעובדים:
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="name"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  כותרת:
                </label>
                <input
                  placeholder="כותרת"
                  required
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  id="title"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                 
                />
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="email"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  תיאור ההטבה:
                </label>
                <input
                  placeholder="תיאור ההטבה"
                  required
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  id="description"
                  value={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="image"
                  className=" text-blue-900 text-sm font-semibold "
                >
                  הוסף תמונה:
                </label>
                <br />
                <input
                  placeholder="הוסף תמונה"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  required
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="email"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  קישור:
                </label>
                <input
                  placeholder="הוסף קישור"
                  required
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  id="Link"
                  value={link}
                  name="Link"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="email"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  כותרת לקישור:
                </label>
                <input
                  placeholder="הוסף כותרת לקישור"
                  required
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  id="Linktitle"
                  value={linktitle}
                  name="Linktitle"
                  onChange={(e) => setLinktitle(e.target.value)}
                />
              </div>

              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="email"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  תאריך תום ההטבה:
                </label>
                <input
                  placeholder=""
                  required
                  type="date"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  id="date"
                  value={date}
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mt-4 mb-2 sm:mb-4 text-center">
                <button
                  // onClick={setsubmitReset(false)}
                  type="submit"
                  className="w-56    h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mb-4"
                >
                  הוסף הטבה
                </button>
              </div>
            </form>
          </div>

          <div className="relative bg-white rounded shadow-2x1 p-7 sm:p-10 mt-24">
            <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
              מחק הטבה לעובדים:
            </h3>
            <form onSubmit={handledelete}>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="email"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  שם ההטבה שתרצה למחוק:
                </label>
                <input
                  placeholder="שם ההטבה המדויק"
                  required
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  id="deletebonus"
                  name="deletebonus"
                  onChange={(elemant) => setDeletebonus(elemant.target.value)}
                />
              </div>

              <div className="mt-4 mb-2 sm:mb-4 text-center">
                <button
                  type="submit"
                  className="w-56    h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mb-4"
                >
                  מחק הטבה
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBonusses;
