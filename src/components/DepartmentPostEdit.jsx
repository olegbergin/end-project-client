import React from "react";
import { useForm } from "react-hook-form";

function DepartmentPostEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <div className="bg-gray-900 min-h-screen mt-24 w-screen">
      <div className=" flex justify-center space-x-7 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center flex-col text-xl  bg-white m-16 p-5"
        >
          <h1 className="text-center text-3xl font-bold">הוספת אירוע</h1>
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            אגף
          </label>
          <input
            className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
            type="text"
            placeholder="אגף"
          />
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            כותרת
          </label>
          <input
            className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
            type="text"
            placeholder="כותרת"
            {...register("Title", { required: true, pattern: /"[A-Za-z]+"/i })}
          />
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            מלל
          </label>
          <textarea
            type="text"
            placeholder="מלל"
            {...register}
            className="border-2 border-black/10 rounded-md"
          />
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            תאריך
          </label>
          <input
            className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
            type="date"
            placeholder="תאריך"
            {...register}
          />
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            תמונה
          </label>
          <input
            className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
            type="file"
            accept="image/png/jpeg/svg/gif/jpg"
          />
          <div className="text-center">
            <button
              type="submit"
              className="w-56    h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mb-4"
            >
              פרסם
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentPostEdit;
