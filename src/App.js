import { useState } from "react";
import { Route, Routes } from "react-router";
import { AdminRegister } from "./components/AdminRegister";
import Department from "./components/Department";
import DepartmentPostEdit from "./components/DepartmentPostEdit";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { useSelector } from "react-redux"

function App() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const role = useSelector((state) => state.role.role);

  if (role === "") {
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


        <Routes>
          <Route path="profile" element={<Login />} />
          <Route path="department" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="department_edit" element={<Login />} />
          <Route path="register" element={<Login />} />
        </Routes>
      </div>
    );
  } else {
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


        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="department" element={<Department />} />
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="department_edit" element={<DepartmentPostEdit />} />
          <Route path="register" element={<AdminRegister />} />
        </Routes>
      </div>
    );
  }
}

export default App;
