import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const url = `${process.env.REACT_APP_SERVER}/bonuses`;

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  link: yup.string().required(),
  linktitle: yup.string().required(),
  image: yup.mixed().test("file", "You need to provide a file", (value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  })
});

const UpdateBonusses = () => {

  const [deletebonus, setDeletebonus] = useState("");
  // const [image, setImage] = useState("");
  const token = useSelector((state) => state.user.token);


  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("upload_preset", "oo2ebqls");
    axios
      .post("https://api.cloudinary.com/v1_1/dd5csvtjc/image/upload", formData)
      .then((response) =>
        axios
          .post(`${url}/update`, {
            title: data.title,
            description: data.description,
            image: response.data.secure_url,
            link: data.link,
            linktitle: data.linktitle,
            date: data.date,
          }, { headers: { 'Authorization': `Bearer ${token}` } })
          .then((res) => alert(res.data.message))
          .then(reset())
      );
  };

  const handledelete = async (elemant) => {
    elemant.preventDefault();
    try {
      await axios
        .delete(`${process.env.REACT_APP_SERVER}/bonuses/delete/${deletebonus}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((res) => alert(res.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200">
      <div className="py-12 flex justify-center w-5/6 m-auto">
        <div className="w-screen max-w-xl xl:px-8 ">
          <div className="relative bg-white rounded shadow-2x1 p-7 sm:p-10 mt-24">
            <h1 className="text-center text-3xl font-bold mb-5">
              הוסף הטבה לעובדים:
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="name"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  כותרת:
                </label>
                <input
                  type="text"
                  placeholder="title"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  {...register("title")}
                />
                {errors?.title && (
                  <p className="text-red-600">
                    {errors?.title?.message || "Error!"}
                  </p>
                )}
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="email"
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  תיאור ההטבה:
                </label>
                <input
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  placeholder="description"
                  {...register("description")}
                />
                {errors?.description && (
                  <p className="text-red-600">
                    {errors?.description?.message || "Error!"}
                  </p>
                )}
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
                  type="file"
                  placeholder="הוסף תמונה"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  accept="image/png/jpeg/svg/gif/jpg"
                  {...register("image")}
                />
                {errors?.image && (
                  <p className="text-red-600">{errors?.image?.message || "Error!"}</p>
                )}
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor=""
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  קישור:
                </label>
                <input
                  placeholder="הוסף קישור"
                  required
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  name="Link"
                  {...register("link")}
                />
                {errors?.link && (
                  <p className="text-red-600">
                    {errors?.link?.message || "Error!"}
                  </p>
                )}
              </div>
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor=""
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  כותרת לקישור:
                </label>
                <input
                  placeholder="הוסף כותרת לקישור"
                  required
                  type="text"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  {...register("linktitle")}
                />
                {errors?.linktitle && (
                  <p className="text-red-600">
                    {errors?.linktitle?.message || "Error!"}
                  </p>
                )}
              </div>

              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor=""
                  className="flex  text-blue-900 text-sm font-semibold "
                >
                  תאריך תום ההטבה:
                </label>
                <input
                  required
                  type="date"
                  className=" flex  px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline md:w-72 lg:w-96 w-72  mb-6 p-1"
                  {...register("date")}
                />
                {errors?.date && (
                  <p className="text-red-600">
                    {errors?.date?.message || "Error!"}
                  </p>
                )}
              </div>
              <div className="mt-4 mb-2 sm:mb-4 text-center">
                <input
                  value="הוסף הטבה"
                  type="submit"
                  className="w-56 h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mb-4"
                />
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
                  htmlFor=""
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
                  {...register("deletebonus", {
                    required: true,
                    max: 80,
                    min: 1,
                    maxLength: 80,
                  })}
                  onChange={(elemant) => setDeletebonus(elemant.target.value)}
                />
              </div>

              <div className="mt-4 mb-2 sm:mb-4 text-center">
                <input
                  value="מחק הטבה"
                  type="submit"
                  className="w-56    h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none mb-4"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBonusses;
