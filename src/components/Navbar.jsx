import image from "../images/dimona-logo.png";
import { Link } from "react-router-dom";
export const Navbar = (props) => {
  return (
    <div className="bg-gray-800">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex justify-between items-center ">
          <div
            id="company logo div"
            className="flex w-40 justify-between items-center "
          >
            <img src={image} alt="" id="company logo" className="w-12" />
            <Link to="/">
              <h1
                id="compnay name"
                className="text-white font-semibold text-lg"
              >
                עיריית דימונה
              </h1>
            </Link>
          </div>

          <div className=" items-center w-80 justify-between  hidden sm:flex md:flex lg:flex">
            <div>
              <div className="flex justify-center">
                <button
                  onClick={() => props.setIsOpen(!props.isOpen)}
                  className="text-white  px-5 py-2 font-semibold"
                >
                  אגפים
                </button>
                {props.isOpen && (
                  <div className=" text-white absolute bg-gray-900 w-44 border-2 border-black text-center mt-12 rounded-md z-10">
                    <div className="p-2">
                      <Link to="department">לוגיסטיקה</Link>
                    </div>
                    <hr />
                    <div className="p-2">
                      <Link to="department">בריאות</Link>
                    </div>
                    <hr />
                    <div className="p-2">
                      <Link to="department">תחבורה</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-green-700 font-semibold">
              <Link to="bonuses">הטבות</Link>
            </div>
            <div className="text-white font-semibold">
              <Link to="profile">הפרופיל שלי</Link>
            </div>
            <div className="text-white font-semibold">
              <Link to="register"> הרשמה</Link>
            </div>
          </div>
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
                  <div className="p-2">
                    <Link to="profile">הפרופיל שלי</Link>
                  </div>
                  <div className="p-2">
                    <Link to="bonuses">הטבות</Link>
                  </div>
                  <div className="p-2">
                    <Link to="department">לוגיסטיקה</Link>
                  </div>
                  <div className="p-2">
                    <Link to="department">בריאות</Link>
                  </div>
                  <div className="p-2">
                    <Link to="department">תחבורה</Link>
                  </div>
                  <div className="p-2">
                    <Link to="register">הרשמה</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <Link to="/login" className="text-white font-semibold">
              התחברות
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};