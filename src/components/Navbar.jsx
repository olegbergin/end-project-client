import image from "../images/dimona-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

export const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  const [departmentNames, setDepartmentNames] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5000/name/getnames")
      .then((res) => setDepartmentNames(res.data));
  }, []);

  return (
    <div className="bg-gray-800 w-screen fixed z-50">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex justify-between items-center ">
          <div
            id="company logo div"
            className="flex w-40 justify-between items-center "
          >
            <img src={image} alt="" id="company logo" className="w-12" />
            {!role ? (
              <Link to="/">
                <h1
                  id="compnay name"
                  className="text-white font-semibold text-lg"
                >
                  עיריית דימונה
                </h1>
              </Link>
            ) : (
              <Link to="/">
                <h1 className="text-white font-semibold text-lg">
                  עיריית דימונה
                </h1>
              </Link>
            )}
          </div>

          {role && (
            <div className=" items-center  justify-between  hidden sm:flex md:flex lg:flex">
              <div>
                <div className="flex justify-center x-4">
                  <button
                    onClick={() => props.setIsOpen(!props.isOpen)}
                    className="text-white  px-5 py-2 font-semibold"
                  >
                    אגפים
                  </button>
                  {props.isOpen && (
                    <div className=" text-white absolute bg-gray-900 w-44 border-2 border-black text-center mt-12 rounded-md z-10">
                      {departmentNames?.map((theName, index) => {
                        return (
                          theName.theName !== "ראשי" && (
                            <div key={index} className="p-2">
                              <Link
                                to="department"
                                state={{ department: theName.theName }}
                              >
                                {theName.theName}
                              </Link>
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-green-700 font-semibold mx-3">
                <Link to="bonusses">הטבות</Link>
              </div>
              <div className="text-white font-semibold mx-3">
                <Link to="profile">הפרופיל שלי</Link>
              </div>
              <div className="text-white font-semibold mx-3">
                <Link to="terms">תקנון </Link>
              </div>
              {role === "SUPERADMIN" && (
                <div className="flex justify-center">
                  <button
                    onClick={() => props.setAnotherOpen(!props.anotherOpen)}
                    className="text-white  px-5 py-2 font-semibold"
                  >
                    מנהל
                  </button>
                  {props.anotherOpen && (
                    <div className=" text-white absolute bg-gray-900 w-44 border-2 border-black text-center mt-10 rounded-md z-10">
                      <div className="p-2">
                        <Link to="register"> הרשמה</Link>
                      </div>
                      <hr />
                      <div className="p-2">
                        <Link to="department_edit"> עריכת אירוע</Link>
                      </div>
                      <hr />
                      <div className="p-2">
                        <Link to="updatebonusses">עריכת הטבות</Link>
                      </div>
                      <hr />
                      <div className="p-2">
                        <Link to="departmentedit">עריכת אגפים</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {role === "ADMIN" && (
                <div className="text-white font-semibold mx-3">
                  <Link to="department_edit"> עריכת אירוע</Link>
                </div>
              )}
            </div>
          )}
          {role && (
            <div
              className="space-y-2 sm:hidden md:hidden lg:hidden mt-3"
              onClick={() => props.setHamburgerOpen(!props.hamburgerOpen)}
            >
              <span className="block w-8 h-1 bg-gray-600"></span>
              <span className="block w-8 h-1 bg-gray-600"></span>
              <span className="block w-8 h-1 bg-gray-600"></span>
              <div className="flex justify-center">
                {props.hamburgerOpen && (
                  <div className=" text-white absolute bg-gray-900 w-44 border-2 border-black text-center mt-10 rounded-md z-10">
                    {departmentNames?.map((theName, index) => {
                      return (
                        theName.theName !== "ראשי" && (
                          <div key={index} className="p-2">
                            <Link
                              to="department"
                              state={{ department: theName.theName }}
                            >
                              {theName.theName}
                            </Link>
                          </div>
                        )
                      );
                    })}
                    <div className="p-2">
                      <Link to="profile">הפרופיל שלי</Link>
                    </div>
                    <div className="p-2">
                      <Link to="terms">תקנון</Link>
                    </div>
                    <div className="p-2">
                      <Link to="bonusses">הטבות</Link>
                    </div>

                    {role === "SUPERADMIN" && (
                      <div>
                        <div className="p-2">
                          <Link to="register">הרשמה</Link>
                        </div>
                        <div className="p-2">
                          <Link to="department_edit">הוספת אירוע</Link>
                        </div>
                        <div className="p-2">
                          <Link to="updatebonusses">עריכת הטבות</Link>
                        </div>
                      </div>
                    )}
                    {role === "ADMIN" && (
                      <div className="p-2">
                        <Link to="department_edit">הוספת אירוע</Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {!role && (
            <div>
              <Link to="/login" className="text-white font-semibold">
                התחברות
              </Link>
            </div>
          )}
          {role && (
            <div>
              <button
                className="text-red-700 font-semibold"
                onClick={() => {
                  dispatch(logOut());
                  navigate("/");
                }}
              >
                התנתק
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
