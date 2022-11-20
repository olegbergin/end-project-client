import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const url = "http://localhost:5000/departments";

const schema = yup.object().shape({
  department: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().required(),
  publish: yup.bool().required(),
  image: yup.mixed().test("file", "You need to provide a file", (value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  }),
});

function DepartmentPostEdit() {

  const [deletepost, setDeletepost] = useState("");
  const [departmentNames, setDepartmentNames] = useState();


  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });


  const onSubmit = async (data, e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', data.image[0])
    formData.append('upload_preset', "oo2ebqls")
    axios
      .post("https://api.cloudinary.com/v1_1/dd5csvtjc/image/upload", formData)
      .then((response) => 
       axios
        .post(`${url}/departmentedit`, {
          title: data.title,
          department: data.department,
          description: data.description,
          date: new Date(data.date),
          image: response.data.secure_url,
          publish: data.publish
        })
        .then((res) => console.log(res.data))
        .then(reset()))
  }

  const handledelete = async (elemant) => {
    elemant.preventDefault();
    try {
      await axios
        .delete(`http://localhost:5000/departments/delete/${deletepost}`)
        .then((res) => console.log(res.data));
        
    } catch (error) {
      console.log(error);
    }
    setDeletepost('')
  };



  useEffect(() => {
    axios
      .post("http://localhost:5000/name/getnames")
      .then((res) => setDepartmentNames(res.data));
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen mt-24 w-screen">
      <div className=" flex justify-around  flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center flex-col text-xl  bg-white m-10 p-5"
        >
          <h1 className="text-center text-3xl font-bold">הוספת אירוע</h1>
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            אגף
          </label>
          <select
            className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
            name=""
            id=""
            {...register("department")}
          >
            <option value="">בחר ענף</option>
            {departmentNames?.map((name, index) => {
              return (
                <option key={index} value={name.theName}>
                  {name.theName}
                </option>
              );
            })}
          </select>
          {errors?.department && (
            <p className="text-red-600">
              {errors?.department?.message || "Error!"}
            </p>
          )}
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
            {...register("title")}
          />
          {errors?.title && (
            <p className="text-red-600">
              {errors?.title?.message || "Error!"}
            </p>
          )}
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            מלל
          </label>

          <textarea
            type="text"
            placeholder="מלל"
            {...register("description")}
            className="border-2 border-black/10 rounded-md"
          />
          {errors?.description && (
            <p className="text-red-600">
              {errors?.description?.message || "Error!"}
            </p>
          )}

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
            {...register("date")}
          />
          {errors?.date && (
            <p className="text-red-600">
              {errors?.date?.message || "Error!"}
            </p>
          )}
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            תמונה
          </label>
          <input
            className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
            type="file"
            {...register("image", {
              required: true,
            })}
            accept="image/png/jpeg/svg/gif/jpg"
            {...register("image")}
          // onChange={(e) => setImage(e.target.files[0])}
          />
          {errors?.image && (
            <p className="text-red-600">
              {errors?.image?.message || "Error!"}
            </p>
          )}
          <label
            htmlFor=""
            className="flex  text-blue-900 text-sm font-semibold "
          >
            עדכן את כלל העובדים ?
          </label>
          <input
            // className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
            type="checkbox"
            {...register("publish")}

          />
        
          <div className="text-center">
            <input
              type="submit"
              className="w-56    h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mb-4"
              value="הוסף אירוע"
            />

          </div>
        </form>
        <div className="m-10">
          <div className=" bg-white rounded  sm:p-10 p-5">
            <h3 className="text-center text-3xl font-bold mb-5">
              מחק אירוע לעובדים:
            </h3>
            <form onSubmit={handledelete}>
              <div className="mb-1 sm:mb-2 ">
                <label
                  htmlFor="email"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  שם האירוע שתרצה למחוק:
                </label>
                <input
                  placeholder="שם האירוע המדויק"
                  required
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-3"
                  onChange={(elemant) => setDeletepost(elemant.target.value)}
                />
              </div>

              <div className="mt-4 mb-2 sm:mb-4 text-center">
                <button
                  type="submit"
                  className="w-56 h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none"
                >
                  מחק אירוע
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentPostEdit;
