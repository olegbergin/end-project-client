import { useEffect, useState } from "react";
import { redirect, Route, Routes, useLocation } from "react-router";
import { AdminRegister } from "./components/AdminRegister";
import Department from "./components/Department";
import DepartmentPostEdit from "./components/DepartmentPostEdit";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { Terms } from "./components/Terms";
import UpdateBonusses from "./components/UpdateBonusses";
import Bonusses from "./components/Bonusses";
import Calendar from "./components/Calendar";
import { io } from "socket.io-client";
import { Messanger } from "./components/Messanger";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateEmail,
  updateName,
  updateRole,
  updateToken,
} from "./redux/userSlice";
import jwt_decode from "jwt-decode";
import { Home } from "./components/Home";
import { AddDepartments } from "./components/AddDepartment";
import { PropsProfile } from "./components/PropsProfile";
import PageNoteFound from "./components/PageNotFound";
import { Speech } from "./components/Speech";
import axios from "axios";
import { updatePosts } from "./redux/postsSlice";
import { updateProfiles } from "./redux/profilesSlice";
import { updateTheBonusses } from "./redux/bonusesSlice";

function App() {
  const socket = io.connect(`${process.env.REACT_APP_SERVER}`, {
    transports: ["websocket"],
  });

  const [messageList, setMessageList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const [anotherOpen, setAnotherOpen] = useState(false);
  const token = useSelector((state) => state.user.token);

  const { pathname } = useLocation();

  const [loading, setLoading] = useState(false);

  const role = useSelector((state) => state.user.role);
  // USER / ADMIN / SUPERADMIN

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER}/departments/get`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(updatePosts(res.data)));

    const storage = localStorage.getItem("myToken");
    if (storage) {
      dispatch(updateToken(storage));
      const decoded = jwt_decode(storage);
      dispatch(updateRole(decoded.role));
      dispatch(updateEmail(decoded.id));
      dispatch(updateName(decoded.fullname));
    } else {
      redirect("/login");
    }
    axios
      .get(`${process.env.REACT_APP_SERVER}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(updateProfiles(res.data));
      });

    axios
      .post(`${process.env.REACT_APP_SERVER}/bonuses/get`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(updateTheBonusses(res.data));
      });

    socket.emit("join_room");
    setLoading(false);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    socket.on("back", (message) => {
      setMessageList((list) => [...list, message]);
    });
  });

  return loading ? (
    <div dir="rtl">
      <Navbar
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        hamburgerOpen={hamburgerOpen}
        setHamburgerOpen={setHamburgerOpen}
        anotherOpen={anotherOpen}
        setAnotherOpen={setAnotherOpen}
      />
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg
            className="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="overflow-hidden"
      dir="rtl"
      onClick={() => {
        isOpen && setIsOpen(false);
        hamburgerOpen && setHamburgerOpen(false);
        anotherOpen && setAnotherOpen(false);
      }}
    >
      <Navbar
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        hamburgerOpen={hamburgerOpen}
        setHamburgerOpen={setHamburgerOpen}
        anotherOpen={anotherOpen}
        setAnotherOpen={setAnotherOpen}
      />
      <Messanger
        socket={socket}
        messageList={messageList}
        setMessageList={setMessageList}
      />
      {!role && (
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      )}
      {role === "USER" && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="department" element={<Department />} />
          <Route path="terms" element={<Terms />} />
          <Route path="login" element={<Profile />} />
          <Route path="bonusses" element={<Bonusses />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="companyuser" element={<PropsProfile />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      )}
      {role === "ADMIN" && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="department" element={<Department />} />
          <Route path="department_edit" element={<DepartmentPostEdit />} />
          <Route path="terms" element={<Terms />} />
          <Route path="login" element={<Profile />} />
          <Route path="bonusses" element={<Bonusses />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="companyuser" element={<PropsProfile />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      )}
      {role === "SUPERADMIN" && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="department" element={<Department />} />
          <Route path="department_edit" element={<DepartmentPostEdit />} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="updatebonusses" element={<UpdateBonusses />} />
          <Route path="terms" element={<Terms />} />
          <Route path="login" element={<Profile />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="bonusses" element={<Bonusses />} />
          <Route path="departmentedit" element={<AddDepartments />} />
          <Route path="companyuser" element={<PropsProfile />} />
          <Route path="*" element={<PageNoteFound />} />
          <Route path="speech" element={<Speech />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
