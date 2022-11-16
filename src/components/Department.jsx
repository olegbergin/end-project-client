import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

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
        {department}
      </h1>
      <div className="mt-24 ">
        <div className="flex justify-center">
          {postData?.map((post, index) => {
            return (
              <div
                key={index}
                className="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 text-center justify-end w-96 mt-6 mr-10"
              >
                <h1>{post.title}</h1>
                <h1>{post.description}</h1>
                <h1>{post.date}</h1>
                <img
                  className="w-20   object-fill"
                  src={post.image}
                  alt="Sunset in the mountains"
                />
              </div>
            );
          })}
        </div>
        <h1 className="mt-10 text-center">עובדים באגף</h1>
        <div className="flex justify-center mt-14">
          {userData?.map((user, index) => {
            return (
              <div
                key={index}
                className="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 text-center justify-end w-96 mb-6"
              >
                <h1>{user.fullname}</h1>
                <img
                  className="w-20   object-fill"
                  src={user.image}
                  alt="Sunset in the mountains"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Department;
