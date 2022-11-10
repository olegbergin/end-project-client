import { useForm } from "react-hook-form";

export const AdminRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <div className="bg-gray-900 ">
      <div className="py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row ">
          <div className="max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12 ">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none ">
              הכנסת עובדים למערכת
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg ">
              הכנס את פרטי העובד על מנת ליצור לו חשבון באתר.
            </p>
          </div>
          <div className=" xl:px-8">
            <div className="flex flex-col items-center md:relative lg:relative">
              <div className=" bg-white rounded shadow-2xl p-7 sm:p-10 w-52 md:w-full lg:w-full sm:w-full">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl text-center">
                  הרשמה
                </h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="text-center">
                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="text"
                    placeholder="Full Name"
                    {...register("Full Name", {
                      required: true,
                      maxLength: 80,
                    })}
                  />
                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="text"
                    placeholder="User Name"
                    {...register("User Name", {
                      required: true,
                      maxLength: 80,
                    })}
                  />
                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="file"
                    accept="image/png/jpg/svg/gif/jpeg"
                    placeholder="Image"
                    {...register("Image", {
                      required: true,
                    })}
                  />
                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="text"
                    placeholder="Branch"
                    {...register("Branch", {
                      required: true,
                    })}
                  />
                </div>
                <div className="text-center">
                  <select
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="select"
                    placeholder="Role"
                    {...register("Role", {
                      required: true,
                    })}
                  >
                    <option value="admin">מנהל גף</option>
                    <option value="user">משתמש</option>
                  </select>

                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="email"
                    placeholder="Email"
                    {...register("Email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="tel"
                    placeholder="Mobile number"
                    {...register("Mobile number", {
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                  />
                  <select
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="select"
                    placeholder="Sex"
                    {...register("Sex", {
                      required: true,
                    })}
                  >
                    <option value="Male">זכר</option>
                    <option value="Female">נקבה</option>
                  </select>
                </div>
                <div className="text-center">
                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="password"
                    placeholder="Password"
                    {...register("Password", {
                      required: true,
                    })}
                  />
                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="date"
                    placeholder="Birthday"
                    {...register("Birthday", {
                      required: true,
                    })}
                  />
                  <input
                    className="flex-grow h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline w-32 m-2"
                    type="text"
                    placeholder="Adress"
                    {...register("Adress", {
                      required: true,
                    })}
                  />
                  <input type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
