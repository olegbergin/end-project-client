import axios from "axios";
import { useState } from "react";

export const Speech = () => {
  const [speech, setSpeech] = useState("");
  const handleSubmit = () => {
    speech
      ? axios
          .post("http://localhost:5000/auth/speech", { speech: speech })
          .then((res) => alert(res.data.message))
      : alert("אנא הזן טקסט");
  };
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="pt-32 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold ">עריכת דבר ראש - העיר</h1>
        <form
          action=""
          className="flex flex-col mt-5 items-center"
          onSubmit={handleSubmit}
        >
          <textarea
            className="border-2 border-black rounded-lg p-2"
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setSpeech(e.target.value)}
          />
          <button
            type="submit"
            className="w-56 h-12 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mt-5"
          >
            עדכן
          </button>
        </form>
      </div>
    </div>
  );
};
