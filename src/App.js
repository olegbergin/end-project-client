import { Route, Routes } from "react-router";
import Department from "./components/Department";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";

function App() {
  return (
    <div className="App" dir="rtl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="department" element={<Department />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
