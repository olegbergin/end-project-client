import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";





const Bonusses = () => {

const [bonuses, setBonuses] = useState();
useEffect(() => {
axios.post("http://localhost:5000/bonuses/get").then((res) => setBonuses(res.data))
},[])




    return (
        <div className="space-y-4 border w-22 border-r-8 mt-24">
    <div className="pt-6 text-center space-y-4 text-xl text-decoration-line: underline" >הטבות לעובדי העירייה</div>
    <p className="w-2/3">אמנם היצע מגוון ההטבות המוענק לעובדים שלנו ידוע ומוערך בשוק בעבודה אבל בכל זאת החלטנו לתת לכם טעימה משלל הביטוחים, הפעילויות המשפחתיות, יוזמות התרבות והפנאי, שירותי הרווחה וההטבות השונות שיש אצלנו. הטוב הזה ברובו עוטף לא רק את עובדי החברה אלא גם את בני משפחותיהם, כי כאלה אנחנו.</p>
        {bonuses?.map(({_id, image, title, description, Link, linktitle, date, isimage}) => {
            {console.log(linktitle)}
          return (
             <div className="py-8 px-8 max-w mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex  sm:space-y-0 sm:space-x-6" key={_id}>
     <p className="text-lg text-black font-semibold text-decoration-line: underline text-center">
        {title}
      </p>
  <img className="h-24   " src={image} alt="Woman's Face"/>
  <div className="space-y-2 ">
    <div className="space-y-0.5">
      <p className="text-slate-500 font-medium w-2/3 ">
        {description}
      </p>
      <date className="text-slate-500 font-medium">{date}</date>
    </div>
    <a href={`${Link}`} target='_blank'  rel="noreferrer" ><button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        {linktitle}</button></a>
  </div>
</div>

)
})
}
            </div>
            
        
        )
  }

  
  export default Bonusses