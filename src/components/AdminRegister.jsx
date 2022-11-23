import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  useSelector } from 'react-redux';



const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  fullname: yup.string().required(),
  phone: yup.string().required(),
  sex: yup.string().required(),
  adress: yup.string().required(),
  birthday: yup.date().required(),
  department: yup.string().required(),
  role: yup.string().required(),
  // image: yup.string().required(),
  contract: yup.string().required(),
});

export const AdminRegister = () => {
  const [image, setImage] = useState("");
  const [departmentNames, setDepartmentNames] = useState();
  const [deleteUser, setDeleteUser] = useState("");
  const token = useSelector((state) => state.user.token);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/name/getnames`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => setDepartmentNames(res.data));
  }, [token]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "oo2ebqls");

    axios
      .post("https://api.cloudinary.com/v1_1/dd5csvtjc/image/upload", formData, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response) =>
        axios
          .post(`${process.env.REACT_APP_SERVER}/auth/registration`, {
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
          }, { headers: { 'Authorization': `Bearer ${token}` } })
          .then((res) => {
            alert(res.data.message);
          })
      );
    reset();
  };

  const handledelete = async (elemant) => {
    elemant.preventDefault();
    try {
      await axios
        .delete(`http://localhost:5000/auth/delete/${deleteUser}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200  min-h-screen">
      <div className="py-10 ">
        <div className=" items-center justify-between xl:flex-row mt-20">
          <div className="flex justify-center">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight  sm:text-4xl sm:leading-none">
              הכנסת עובדים למערכת
            </h2>
          </div>
          <div className=" xl:px-8 flex justify-center items-center flex-col ">
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
                  {...register("fullname")}
                />
                {errors?.fullname && (
                  <p className="text-red-600">
                    {errors?.fullname?.message || "Error!"}
                  </p>
                )}
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
                      {...register("email")}
                    />
                    {errors?.email && (
                      <p className="text-red-600">
                        {errors?.email?.message || "Error!"}
                      </p>
                    )}
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
                      {...register("adress")}
                    />
                    {errors?.adress && (
                      <p className="text-red-600">
                        {errors?.adress?.message || "Error!"}
                      </p>
                    )}
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      אגף{" "}
                    </label>
                    <select
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="select"
                      placeholder="Department"
                      {...register("department")}
                    >
                      {departmentNames?.map((theName, index) => {
                        return (
                          <option key={index} value={theName.theName}>
                            {theName.theName}
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
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      תפקיד{" "}
                    </label>
                    <select
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="select"
                      placeholder="Role"
                      {...register("role")}
                    >
                      <option value="ADMIN">מנהל גף</option>
                      <option value="USER">משתמש</option>
                    </select>
                    {errors?.role && (
                      <p className="text-red-600">
                        {errors?.role?.message || "Error!"}
                      </p>
                    )}
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      חוזה עבודה
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="String"
                      placeholder="contract url"
                      {...register("contract")}
                    />
                    {errors?.contract && (
                      <p className="text-red-600">
                        {errors?.contract?.message || "Error!"}
                      </p>
                    )}
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
                      {...register("phone")}
                    />
                    {errors?.phone && (
                      <p className="text-red-600">
                        {errors?.phone?.message || "Error!"}
                      </p>
                    )}
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
                      {...register("sex")}
                    >
                      <option value="Male">זכר</option>
                      <option value="Female">נקבה</option>
                    </select>
                    {errors?.sex && (
                      <p className="text-red-600">
                        {errors?.sex?.message || "Error!"}
                      </p>
                    )}
                    <label
                      htmlFor=""
                      className="flex  text-blue-900 text-xs font-semibold mx-2"
                    >
                      סיסמא{" "}
                    </label>
                    <input
                      className=" flex h-12 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 sm:w-44 w-32  mb-2 mx-2"
                      type="text"
                      placeholder="Password"
                      {...register("password")}
                    />
                    {errors?.password && (
                      <p className="text-red-600">
                        {errors?.password?.message || "Error!"}
                      </p>
                    )}
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
                      {...register("birthday")}
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
                      accept="image/png/jpg/svg/gif/jpeg/pneg/pdf"
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
            <div className=" bg-white rounded shadow-2x1 mt-20 w-1/2 flex flex-col items-center justify-center">
              <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                מחיקת משתמשים:
              </h3>
              <form onSubmit={handledelete}>
                <div className="mb-1 sm:mb-2">
                  <label
                    htmlFor=""
                    className="flex justify-center text-blue-900 text-xs  font-semibold "
                  >
                    שם המשתמש שתרצה למחוק:
                  </label>
                  <input
                    placeholder="שם המשתמש המדויק"
                    required
                    type="text"
                    className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1 justify-center "
                    id="deletebonus"
                    name="deletebonus"
                    {...register("deletebonus", {
                      required: true,
                      max: 80,
                      min: 1,
                      maxLength: 80,
                    })}
                    onChange={(elemant) => setDeleteUser(elemant.target.value)}
                  />
                </div>
                <div className="mt-4 mb-2 sm:mb-4 text-center">
                  <input
                    value="מחק משתמש"
                    type="submit"
                    className="w-56 cursor-pointer h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mb-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
