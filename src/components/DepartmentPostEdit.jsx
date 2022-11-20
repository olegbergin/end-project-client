import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const url = "http://localhost:5000/departments";

const schema = yup.object().shape({
  title: yup.string().required(),
  department: yup.string().required(),
  description: yup.string().required(),
  date: yup.string().required(),
  // image: yup.string().required()
});

function DepartmentPostEdit() {

  const [deletepost, setDeletepost] = useState("");
  const [departmentNames, setDepartmentNames] = useState();
  const [image, setImage] = useState("");

  const { register, handleSubmit, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });


  const onSubmit  = async (data, e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('file',image)
    formData.append('upload_preset',"oo2ebqls")
    axios
         .post("https://api.cloudinary.com/v1_1/dd5csvtjc/image/upload",formData)
         .then((response)=> 
          axios
          .post(`${url}/departmentedit`, {
           department: data.department,
           title: data.title,
           description: data.description,
           date: data.date,
           image: response.data.secure_url,
        })
        .then((res) => console.log(res.data))
         .then(console.log(data))
        .then(reset()))

  };


  const handledelete = async (elemant) => {
    elemant.preventDefault();
    try {
      await axios
        .delete(`http://localhost:5000/departments/delete/${deletepost}`)
        .then((res) => console.log(res.data));
        
    } catch (error) {
      console.log("error!!!!");
    }
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
            {...register("department", { required: true})}
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
            {...register("title", { required: true, pattern: /"[A-Za-z]+"/i })}
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
            {...register("description", {
              required: true,
              max: 80,
              min: 1,
              maxLength: 80,
            })}
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
            {...register("date", {
              required: true,
            })}
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
            {...register("image", {
              required: true,
            })}
            accept="image/png/jpeg/svg/gif/jpg"
            onChange={(e) => setImage(e.target.files[0])}
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
