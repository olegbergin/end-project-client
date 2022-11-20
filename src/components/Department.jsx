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
    <div>
      <h1 className="text-5xl flex justify-center mb-10 font-semibold text-gray-900 mt-36">
        אגף ה{department}
      </h1>
      <div className="mt-5 sm:flex-row md:flex-row lf:flex-row flex flex-col sm:items-start md:items-start lg:items-start items-center">
        <div className="p-10 w-5/6">

          {postData?.map((post, index) => {
            return (
              <div
                key={index}
                className="lg:flex-row md:flex-row sm:flex-row my-10 flex flex-col items-center "
              >
                <img src={post.image} alt="" className="w-40 mb-5" />
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

        
        <div className="sm:w-1/6 md:w-1/6 lg:w-1/6">
          <h1 className="text-center text-xl font-bold mt-10">עובדים באגף</h1>
          <div className="flex flex-col  ml-5 border-2 border-gray-400/50 rounded-lg px-4 md:h-5/6 sm:h-5/6 lg:h-5/6 mb-4 overflow-scroll scrollbar-hide">

             {
            userData?.map((user, index) => {
              return (
                <Link
                  to="/companyuser"
                  key={index}
                  className="bg-slate-100 my-2 rounded-2xl h-16 p-8 md:p-0 dark:bg-slate-800 flex flex-row-reverse justify-around items-center border-black/50 border-2 "
                  state={{ email: user.email }}
                >
                  <h1 className="w-2/3 font-semibold text-blue-800 text-xl pr-2 overflow-hidden scrollbar-hide">
                    {user.fullname}
                  </h1>
                  <img
                    className="w-12  h-12 rounded-full  object-fill"
                    src={user.image}
                    alt="Sunset in the mountains"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;
