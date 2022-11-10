import { useState } from "react";
import { Route, Routes } from "react-router";
import Department from "./components/Department";

import Department_Post_Edit from "./components/Department_Post_Edit";

import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

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
        <Route path="department_edit" element={<Department_Post_Edit />} />
      </Routes>
    </div>
  );
}

export default App;
