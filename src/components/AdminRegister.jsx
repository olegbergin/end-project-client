import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export const AdminRegister = () => {
  const [image, setImage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data,e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('file',image)
    formData.append('upload_preset',"oo2ebqls")

    axios.post("https://api.cloudinary.com/v1_1/dd5csvtjc/image/upload",formData)
    .then((response)=>
 axios
      .post("http://localhost:5000/auth/registration", {
        email: data.email,
        password: data.password,
        fullname: data.fullname,
        phone: data.phone,
        sex: data.sex,
        adress: data.adress,
        birthday: new Date(data.birthday),
        department: data.department,
        role: data.role,
        image: response.data.secure_url,
        contract: data.contract,
      })
      .then((res) => {
        alert(res.data.message);
      }))
    reset();
  };


  return (
    <div className="bg-gray-900  min-h-screen">
      <div className="py-10 ">
        <div className=" items-center justify-between xl:flex-row mt-20">
          <div className="flex justify-center">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
              הכנסת עובדים למערכת
            </h2>
          </div>
          <div className=" xl:px-8 ">
            <div className="flex flex-col items-center md:relative lg:relative">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white flex flex-col justify-center items-center"
              >
                <label
                  htmlFor=""
                  className="flex  text-blue-900 text-xs font-semibold mx-2 mt-4"
                >
                  שם מלא{" "}
                </label>
                <input
                  className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline mx-2 w-5/6"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullname", {
                    required: true,
                    maxLength: 80,
                  })}
                />
                <div className="flex p-2">
                  <div>
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      אימייל{" "}
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="text"
                      placeholder="email"
                      {...register("email", {
                        required: true,
                        maxLength: 80,
                      })}
                    />
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      כתובת{" "}
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="text"
                      placeholder="Adress"
                      {...register("adress", {
                        required: true,
                      })}
                    />
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      אגף{" "}
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="text"
                      placeholder="Department"
                      {...register("department", {
                        required: true,
                      })}
                    />
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      תפקיד{" "}
                    </label>
                    <select
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="select"
                      placeholder="Role"
                      {...register("role", {
                        required: true,
                      })}
                    >
                      <option value="ADMIN">מנהל גף</option>
                      <option value="USER">משתמש</option>
                    </select>
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      חוזה עבודה
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="text"
                      placeholder="contract"
                      {...register("contract", {
                        required: true,
                      })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      מס' טלפון{" "}
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="text"
                      placeholder="Mobile number"
                      {...register("phone", {
                        required: true,
                      })}
                    />
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      מין{" "}
                    </label>
                    <select
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="select"
                      placeholder="Sex"
                      {...register("sex", {
                        required: true,
                      })}
                    >
                      <option value="Male">זכר</option>
                      <option value="Female">נקבה</option>
                    </select>
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      סיסמא{" "}
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      תאריך לידה{" "}
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="date"
                      valueAsDate
                      placeholder="Birthday"
                      {...register("birthday", {
                        required: true,
                      })}
                    />
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      תמונה
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="file"
                      accept="image/png/jpg/svg/gif/jpeg/pneg"
                      placeholder="Image"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-56  inline-flex items-center justify-center  h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mb-4"
                  >
                    שמור משתמש
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
