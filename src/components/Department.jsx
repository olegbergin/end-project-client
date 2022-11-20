import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function Department() {
  const [postData, setpostData] = useState();
  const [userData, setuserData] = useState();
  const location = useLocation();
  const { department } = location.state;
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/departments/data", {
        department: department,
      })
      .then((res) => setpostData(res.data));
  }, [department]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/auth/userbydepartment", {
        department: department,
      })
      .then((res) => setuserData(res.data));
  }, [department]);

  return (
    <div className="flex flex-col items-center bg-gray-200">
      {modal && (
        <div className="fixed bg-black bg-opacity-25 backdrop-blur-sm inset-0  flex flex-col items-center">
          <div className="w-screen min-h-screen pt-32 flex flex-col items-center ">
            <ul className="flex flex-col divide divide-y h-96 overflow-scroll scrollbar-hide border-2 rounded-lg mb-2 bg-white">
              {userData?.map((user, i) => {
                return (
                  <Link to="/companyuser" key={i} state={{ email: user.email }}>
                    <li className="flex flex-row p-2">
                      <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                        <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                          <div className="block relative">
                            <img
                              alt="profil"
                              src={user.image}
                              className="mx-auto object-cover rounded-full h-10 w-10 "
                            />
                          </div>
                        </div>
                        <div className="flex-1 pl-1 mr-16">
                          <div className="font-medium dark:text-white">
                            {user.fullname}
                          </div>
                          <div className="text-gray-600 dark:text-gray-200 text-sm">
                            {department}
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
            <button
              className="inline-flex items-center justify-center  h-12 px-6 font-medium border-2 border-black rounded-lg bg-gray-600 text-white hover:bg-gray-900 mb-4 transition duration-300"
              onClick={() => setModal(!modal)}
            >
              סגור
            </button>
          </div>
        </div>
      )}
      <div className="pt-36 flex flex-col items-center">
        <h1 className="text-5xl flex justify-center mb-10 font-semibold text-gray-900">
          אגף ה{department}
        </h1>
        <button
          className="inline-flex items-center justify-center  h-12 px-6 font-medium border-2 border-black rounded-lg bg-gray-600 text-white hover:bg-gray-900 mb-4 transition duration-300"
          onClick={() => setModal(!modal)}
        >
          הצג עובדים באגף
        </button>
      </div>
      <div className="mt-5 sm:flex-row md:flex-row lf:flex-row flex flex-col sm:items-start md:items-start lg:items-start items-center ">
        <div className="p-10  ">
          {postData?.map((post, index) => {
            return (
              <div
                key={index}
                className="lg:flex-row md:flex-row sm:flex-row my-10 flex flex-col items-center  bg-white p-2 border-2 border-gray-700 rounded-lg"
              >
                <img src={post.image} alt="" className="w-40 " />
                <div className="flex flex-col md:pr-10 lg:pr-10 space-y-3 justify-center items-center">
                  <h1 className="text-xl font-bold">{post.title}</h1>
                  <h1 className="text-lg font-semibold w-5/6">
                    {post.description}
                  </h1>
                  <h1 className="text-xs text-black/60 ">{post.date}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Department;
