import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Bonusses from "./components/Bonusses";
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
        <Route path="login" element={<Login />} />
        <Route path="bonuses" element={<Bonusses />} />
      </Routes>
    </div>
  );
}

export default App;
