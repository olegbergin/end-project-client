import React from "react";
import { useForm } from "react-hook-form";

function DepartmentPostEdit() {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <div>
        <div className="flex justify-center text-5xl">הוספת אירוע</div>
      <div className=" flex justify-center space-x-7">
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center flex-col text-3xl space-y-10 ">
          <input type="text" placeholder="אגף" className="bg-cyan-400" />
          <input
            type="text"
            placeholder="כותרת"
            className="bg-cyan-400"
            {...register("Title", { required: true, pattern: /"[A-Za-z]+"/i })}
          />
          <textarea type="undefined" placeholder="מלל" className="bg-cyan-400 resize"{...register} />
          <input type="undefined" placeholder="תאריך" className="bg-cyan-400"{...register} />
          <input type="file"  accept="image/png/jpeg/svg/gif/jpg" placeholder="להוסיף תמונה" className="bg-cyan-400" />
          <button type="submit" className="bg-cyan-400">פרסם</button>
        </form>
      </div>  
    </div>
  );
}

export default DepartmentPostEdit;
