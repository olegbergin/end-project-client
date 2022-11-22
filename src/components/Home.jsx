import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";
import { FaBirthdayCake } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

export const Home = () => {
  const [events, setEvents] = useState();
  const [monthlyBirthday, setMonthlyBirthday] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [allUsers, setAllUsers] = useState();
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const TodaysMonth = `${new Date().getMonth()}`;
    axios
      .post(`${process.env.REACT_APP_SERVER}/departments/data`, {
        department: "ראשי",
      })
      .then((res) => setEvents(res.data));
    axios.get(`${process.env.REACT_APP_SERVER}/auth/users`).then((res) => {
      setAllUsers(res.data);
      for (let i = 0; i < res.data.length; i++) {
        const birthdayMonth = `${new Date(res.data[i].birthday).getMonth()}`;
        birthdayMonth === TodaysMonth &&
          setMonthlyBirthday((l) => [
            ...l,
            {
              fullname: res.data[i].fullname,
              image: res.data[i].image,
              email: res.data[i].email,
            },
          ]);
      }
    });
  }, []);
  return (
    <div className="bg-gray-200 min-h-screen">
      {open && (
        <div className="fixed bg-black bg-opacity-25 backdrop-blur-sm inset-0 pt-32 flex flex-col items-center z-40">
          <ul className="flex flex-col divide divide-y max-h-96 overflow-scroll scrollbar-hide border-2 rounded-lg mb-2 bg-white">
            {monthlyBirthday?.map((user, i) => {
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
                        <div className="font-medium ">{user.fullname}</div>
                      </div>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
          <AiFillCloseCircle
            className="text-5xl text-red-600 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
      )}
      {modal && (
        <div className="fixed bg-black bg-opacity-25 backdrop-blur-sm inset-0  flex flex-col items-center z-40">
          <div className="w-screen min-h-screen pt-32 flex flex-col items-center ">
            <ul className="flex flex-col divide divide-y h-96 overflow-scroll scrollbar-hide border-2 rounded-lg mb-2 bg-white">
              <div className="h-12 flex justify-center">
                <input
                  type="text"
                  className="rounded-lg bg-gray-100 mt-1  hover:scale-105 h-10 "
                  placeholder="חפש מישהו..."
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
              </div>
              {allUsers
                ?.filter((user) => {
                  if (
                    searchTerm === "" ||
                    user.fullname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return user;
                  } else return null;
                })
                .map((user, i) => {
                  return (
                    <Link
                      to="/companyuser"
                      key={i}
                      state={{ email: user.email }}
                    >
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
                            <div className="font-medium">{user.fullname}</div>
                            <div className="text-gray-600 text-black/50 text-sm">
                              {user.department}
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  );
                })}
            </ul>
            <AiFillCloseCircle
              className="text-5xl text-red-600 cursor-pointer"
              onClick={() => setModal(!modal)}
            />
          </div>
        </div>
      )}
      <div className="pt-28 w-screen">
        <div className="flex items-center flex-col">
          <h1 className="text-4xl font-bold text-center  ">אירועים אחרונים</h1>
          <div className="w-full flex items-center justify-around pt-10">
            <div className="flex items-center justify-center flex-col">
              <label className="mb-2 font-bold" htmlFor="">
                עובדים בחברה
              </label>
              <BsPeopleFill
                className="text-4xl text-blue-700 cursor-pointer"
                onClick={() => setModal(!modal)}
              />
            </div>
            <div className="flex items-center justify-center flex-col">
              <label className="mb-2 font-bold" htmlFor="">
                ימי הולדת החודש
              </label>
              <FaBirthdayCake
                className="text-4xl text-blue-700 cursor-pointer"
                onClick={handleOpen}
              />
            </div>
          </div>
        </div>
        <div className="p-10 ">
          <h1 className="text-2xl font-bold m-auto mb-4 w-11/12">
            דבר ראש העיר
          </h1>
          <div className="border-2 border-black/30 rounded-md w-11/12 m-auto break-all">
            <p className="p-2">{allUsers && allUsers[0]?.speech}</p>
          </div>
        </div>
        <div className="p-10">
          {events?.map((post, index) => {
            return (
              <div
                key={index}
                className="lg:flex-row md:flex-row sm:flex-row my-10 flex flex-col items-center  bg-white p-2 border-2 border-gray-700 rounded-lg"
              >
                <img src={post.image} alt="" className="w-56 mb-5" />
                <div className="flex flex-col pr-10 space-y-3 justify-center">
                  <h1 className="text-xl font-bold ">{post.title}</h1>
                  <h1 className="text-lg w-5/6">{post.description}</h1>
                  <h1 className="text-xs text-black/60">
                    {`
                    ${new Date(post.date).getFullYear()}/${
                      new Date(post.date).getMonth() + 1
                    }/${new Date(post.date).getDate()}
                    
                      `}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
        <></>
        <Calendar />
      </div>
    </div>
  );
};
