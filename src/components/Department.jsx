import React from "react";
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";




function Department() {
 
  // const [userdepartmentData, setUserdepartmentData] = useState();
  // useEffect(() => {
  // axios.post("http://localhost:5000/auth/userbydepartment").then((res) => setsetUserdepartmentData(res.data))
  // },[])
  
 
  


  return (
    <div className="mt-24">
      <h1 className="text-5xl flex justify-center mb-10 font-semibold text-gray-900">
        שם אגף
      </h1>
      <div className="flex justify-center ">
        <div className="text-xl flex justify-items-center justify-center flex-wrap w-4/6 flex-col ">
          <div className="  text-center">
            <h1>כותרת לכתבה</h1>
          </div>
          <div className="mr-4 mt-4">
            <p>
              פוסט עם מלא תיאור ומילים ומשפטים ושטויות ויופע בו גם תאריך ונוסיף
              תמונה
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-2/6 ">
          <h1 className="mb-5 text-2xl font-medium">העובדים באגף</h1>
          <ul>
            <li className="m-2">
              <div className="flex justify-between w-40 items-center flex-row-reverse ">
                <img
                  src="https://pps.whatsapp.net/v/t61.24694-24/215742736_169130348833804_5618789588749101516_n.jpg?ccb=11-4&oh=01_AdSC1WCVuXHYd2xh_nnwFPNIXNjqdpTvwP8dIfcHPj8IBw&oe=6379D759"
                  className="w-14 rounded-full"
                  alt=""
                />
                <h1>Noam Mery</h1>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Department;
