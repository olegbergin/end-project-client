import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { AdminRegister } from "./components/AdminRegister";
import Department from "./components/Department";
import DepartmentPostEdit from "./components/DepartmentPostEdit";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { Terms } from "./components/Terms";
import { io } from "socket.io-client";
import { Messanger } from "./components/Messanger";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateRole } from "./redux/userSlice";


function App() {
  const socket = io.connect(`http://localhost:5000`, {
    transports: ["websocket"],
  });
  const [messageList, setMessageList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  // USER / ADMIN / SUPERADMIN
  const role = useSelector((state) => state.user.role);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateRole(localStorage.getItem("myRole")))

    socket.emit("join_room");
// eslint-disable-next-line
  }, []);


  useEffect(() => {
    socket.on("back", (message) => {
      setMessageList((list) => [...list, message]);
    });
  });

  return (
    <div
      className="overflow-hidden"
      dir="rtl"
      onClick={() => {
        isOpen && setIsOpen(false);
        hamburgerOpen && setHamburgerOpen(false);
      }}
    >
      <Navbar
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        hamburgerOpen={hamburgerOpen}
        setHamburgerOpen={setHamburgerOpen}
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
          <Route path="profile" element={<Profile />} />
          <Route path="department" element={<Department />} />
          <Route path="terms" element={<Terms />} />
          <Route path="login" element={<Profile />} />
          <Route path="/" element={<Profile />} />
        </Routes>
      )}
      {role === "ADMIN" && (
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="department" element={<Department />} />
          <Route path="department-edit" element={<DepartmentPostEdit />} />
          <Route path="terms" element={<Terms />} />
          <Route path="login" element={<Profile />} />
          <Route path="/" element={<Profile />} />
        </Routes>
      )}
      {role === "SUPERADMIN" && (
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="department" element={<Department />} />
          <Route path="department_edit" element={<DepartmentPostEdit />} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="terms" element={<Terms />} />
          <Route path="login" element={<Profile />} />
          <Route path="/" element={<Profile />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
