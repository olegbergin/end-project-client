import image from "../images/dimona-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

export const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  const [departmentNames, setDepartmentNames] = useState();
  const [current, setCurrent] = useState("");
  const location = useLocation().pathname;
  const page = location.slice(1, location.length);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/name/getnames`)
      .then((res) => setDepartmentNames(res.data));
    setCurrent(page);
  }, [page]);

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
                    <div className=" text-white absolute bg-gray-900 w-44 border-2 border-black text-center mt-12 z-10">
                      {departmentNames?.map((theName, index) => {
                        return (
                          theName.theName !== "ראשי" && (
                            <div
                              key={index}
                              className={
                                current !== theName.theName
                                  ? "p-2 hover:scale-105 transition duration-150"
                                  : "p-2 hover:scale-105 transition duration-150 text-green-700"
                              }
                            >
                              <Link
                                onClick={() => setCurrent(theName.theName)}
                                to="department"
                                state={{ department: theName.theName }}
                              >
                                {theName.theName}
                              </Link>
                              <hr />
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={
                  current !== "bonusses"
                    ? "text-white font-semibold mx-3"
                    : "text-green-700 font-semibold mx-3"
                }
              >
                <Link onClick={() => setCurrent("bonusses")} to="bonusses">
                  הטבות
                </Link>
              </div>
              <div
                className={
                  current !== "profile"
                    ? "text-white font-semibold mx-3"
                    : "text-green-700 font-semibold mx-3"
                }
              >
                <Link onClick={() => setCurrent("profile")} to="profile">
                  הפרופיל שלי
                </Link>
              </div>
              <div
                className={
                  current !== "terms"
                    ? "text-white font-semibold mx-3"
                    : "text-green-700 font-semibold mx-3"
                }
              >
                <Link onClick={() => setCurrent("terms")} to="terms">
                  תקנון{" "}
                </Link>
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
                      <div
                        className={
                          current !== "register" ? "p-2" : "text-green-700 p-2"
                        }
                      >
                        <Link
                          onClick={() => setCurrent("register")}
                          to="register"
                        >
                          {" "}
                          עריכת משתמשים
                        </Link>
                      </div>
                      <hr />
                      <div
                        className={
                          current !== "department_edit"
                            ? "p-2"
                            : "text-green-700 p-2"
                        }
                      >
                        <Link
                          onClick={() => setCurrent("department_edit")}
                          to="department_edit"
                        >
                          {" "}
                          עריכת אירוע
                        </Link>
                      </div>
                      <hr />
                      <div
                        className={
                          current !== "updatebonusses"
                            ? "p-2"
                            : "text-green-700 p-2"
                        }
                      >
                        <Link
                          onClick={() => setCurrent("updatebonusses")}
                          to="updatebonusses"
                        >
                          עריכת הטבות
                        </Link>
                      </div>
                      <hr />
                      <div
                        className={
                          current !== "departmentedit"
                            ? "p-2"
                            : "text-green-700 p-2"
                        }
                      >
                        <Link
                          onClick={() => setCurrent("departmentedit")}
                          to="departmentedit"
                        >
                          עריכת אגפים
                        </Link>
                      </div>
                      <hr />
                      <div
                        className={
                          current !== "speech" ? "p-2" : "text-green-700 p-2"
                        }
                      >
                        <Link onClick={() => setCurrent("speech")} to="speech">
                          עריכת דבר ר.העיר
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {role === "ADMIN" && (
                <div
                  className={
                    current !== "department_edit"
                      ? "text-white font-semibold mx-3"
                      : "text-green-700 font-semibold mx-3"
                  }
                >
                  <Link
                    onClick={() => setCurrent("department_edit")}
                    to="department_edit"
                  >
                    עריכת אירוע
                  </Link>
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
                  <div className=" text-white absolute bg-gray-900 w-44 border-2 border-black text-center mt-4 z-10">
                    {departmentNames?.map((theName, index) => {
                      return (
                        theName.theName !== "ראשי" && (
                          <div
                            key={index}
                            className={
                              current !== theName.theName
                                ? "p-2"
                                : "text-green-700 p-2"
                            }
                          >
                            <Link
                              to="department"
                              onClick={() => setCurrent(theName.theName)}
                              state={{ department: theName.theName }}
                            >
                              {theName.theName}
                            </Link>
                          </div>
                        )
                      );
                    })}
                    <div
                      className={
                        current !== "profile" ? "p-2" : "text-green-700 p-2"
                      }
                    >
                      <Link onClick={() => setCurrent("profile")} to="profile">
                        הפרופיל שלי
                      </Link>
                    </div>
                    <div
                      className={
                        current !== "terms" ? "p-2" : "text-green-700 p-2"
                      }
                    >
                      <Link onClick={() => setCurrent("terms")} to="terms">
                        תקנון
                      </Link>
                    </div>
                    <div
                      className={
                        current !== "bonusses" ? "p-2" : "text-green-700 p-2"
                      }
                    >
                      <Link
                        onClick={() => setCurrent("bonusses")}
                        to="bonusses"
                      >
                        הטבות
                      </Link>
                    </div>

                    {role === "SUPERADMIN" && (
                      <div>
                        <div
                          className={
                            current !== "register"
                              ? "p-2"
                              : "text-green-700 p-2"
                          }
                        >
                          <Link
                            onClick={() => setCurrent("register")}
                            to="register"
                          >
                            עריכת משתמשים
                          </Link>
                        </div>
                        <div
                          className={
                            current !== "department_edit"
                              ? "p-2"
                              : "text-green-700 p-2"
                          }
                        >
                          <Link
                            onClick={() => setCurrent("department_edit")}
                            to="department_edit"
                          >
                            עריכת אירוע
                          </Link>
                        </div>
                        <div
                          className={
                            current !== "updatebonusses"
                              ? "p-2"
                              : "text-green-700 p-2"
                          }
                        >
                          <Link
                            onClick={() => setCurrent("updatebonusses")}
                            to="updatebonusses"
                          >
                            עריכת הטבות
                          </Link>
                        </div>
                        <div
                          className={
                            current !== "departmentedit"
                              ? "p-2"
                              : "text-green-700 p-2"
                          }
                        >
                          <Link
                            onClick={() => setCurrent("departmentedit")}
                            to="departmentedit"
                          >
                            עריכת אגפים
                          </Link>
                        </div>
                        <div
                          className={
                            current !== "speech" ? "p-2" : "text-green-700 p-2"
                          }
                        >
                          <Link
                            onClick={() => setCurrent("speech")}
                            to="speech"
                          >
                            עריכת דבר ר.העיר
                          </Link>
                        </div>
                      </div>
                    )}
                    {role === "ADMIN" && (
                      <div
                        className={
                          current !== "department_edit"
                            ? "p-2"
                            : "text-green-700 p-2"
                        }
                      >
                        <Link
                          onClick={() => setCurrent("department_edit")}
                          to="department_edit"
                        >
                          עריכת אירוע
                        </Link>
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
