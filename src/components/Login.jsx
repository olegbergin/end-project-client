import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateRole } from "../redux/userSlice";
import { updateToken } from "../redux/tokenSlice";
import {  useNavigate } from "react-router-dom";


const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(4, "4-12 symbols").max(12, "4-12 symbols"),
});

export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    axios.post('http://localhost:5000/auth/login', { "email": data.email, "password": data.password })
    .then((res) => {
      dispatch(updateToken(res.data.token))
      var decoded = jwt_decode(res.data.token)
      dispatch(updateRole(decoded.role))
    })
    
    reset();
    navigate('/profile');
  };

  return (
    <div className="bg-gray-900 h-screen flex justify-center items-center ">
      <div className="py-12">
        <div className="flex flex-col items-center justify-between xl:flex-row mt-20">
          <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12 ">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none ">
              אתר הרווחה הרשמי של דימונה
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg ">
              ברוכים הבאים לאתר הרשמי לרווחת עובדי עיריית דימונה, התחברו כדי
              להכנס.
            </p>
          </div>
          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="relative">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-accent-400 lg:w-32 lg:-mr-16 sm:block"
              >
                <defs>
                  <pattern
                    id="766323e1-e594-4ffd-a688-e7275079d540"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
              </svg>
              <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  התחברות
                </h3>
                <form  onSubmit={handleSubmit(onSubmit)}>
                  {/* autoComplete="off" */}
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="name"
                      className="inline-block mb-1 font-medium"
                    >
                      אימייל
                    </label>
                    <input
                      {...register("email")}
                      placeholder="user@gmail.com"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                    {errors?.email && (
                      <p className="text-red-600">{errors?.email?.message || "Error!"}</p>
                    )}
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className="inline-block mb-1 font-medium"
                    >
                      סיסמה
                    </label>
                    <input
                      {...register("password")}
                      placeholder="password"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                    {errors?.password && 
                    <p className="text-red-600">{errors?.password?.message || "Error!"}</p>}
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <input
                      value="התחבר"
                      type="submit"
                      disabled={!isValid}
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-green-700 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" />
                    
                  </div>
                  <p className="text-xs text-gray-600 sm:text-sm text-center">
                    אין לך משתמש? פנה לממונה עליך.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
