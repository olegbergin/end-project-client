import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const url = "http://localhost:5000/departments";

function DepartmentPostEdit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [department, setdepartment] = useState("");
  const [date, setDate] = useState();
  const [deletepost, setDeletepost] = useState("");
  const [imgeUrl, setImageUrl] = useState("");
  const {
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage()
    try { imgeUrl && 
      await axios
        .post(`${url}/departmentedit`, {
          title: title,
          department: department,
          description: description,
          date: date,
          image: imgeUrl,
        })
        .then((res) => console.log(res.data))
        .then(reset());
    } catch (error) {
      console.log("error!!");
    }
    setTitle('')
    setDescription('')
    setImage('')
    setdepartment('')
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
    setDeletepost('')
  };
   
  const uploadImage=()=>{
    const formData = new FormData()
    formData.append('file',image)
    formData.append('upload_preset',"oo2ebqls")

    axios.post("https://api.cloudinary.com/v1_1/dd5csvtjc/image/upload",formData)
    .then((response)=>setImageUrl(response.data.secure_url))

  }

  return (
    <div className="bg-gray-900 min-h-screen mt-24 w-screen">
      <div className=" flex justify-center space-x-7 ">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col text-xl  bg-white m-16 p-5"
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
            onChange={(e) => setdepartment(e.target.value)}
          >
            <option value="">בחר ענף</option>
            <option value="ראשי">ראשי</option>
            <option value="לוגיסטיקה">לוגיסטיקה</option>
            <option value="בריאות">בריאות</option>
            <option value="תחבורה">תחבורה</option>
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
            {...register("Title", { required: true, pattern: /"[A-Za-z]+"/i })}
            onChange={(e) => setTitle(e.target.value)}
            
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
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setDate(e.target.value)}
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
            onChange={(e) => setImage(e.target.files[0])}
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

        <div className="relative bg-white rounded shadow-2x1 p-7 sm:p-10 mt-24">
          <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
            מחק אירוע לעובדים:
          </h3>
          <form onSubmit={handledelete}>
            <div className="mb-1 sm:mb-2">
              <label htmlFor="email" className="inline-block mb-1 font-medium">
                שם האירוע שתרצה למחוק:
              </label>
              <input
                placeholder="שם האירוע המדויק"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="deletebonus"
                name="deletebonus"
                onChange={(elemant) => setDeletepost(elemant.target.value)}
              />
            </div>

            <div className="mt-4 mb-2 sm:mb-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md  hover:bg-gray-700 hover:border-2 hover:border-gray-900 hover:text-white focus:shadow-outline focus:outline-none"
              >
                מחק הטבה
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DepartmentPostEdit;
