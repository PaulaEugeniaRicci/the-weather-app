import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { API_KEY, lang } from "../api/api.jsx";

const CardForecast = ( ) => {
  
  const styles = {
    col: "flex flex-col justify-center mx-auto text-center gap-4 mt-3",
  }

  const [conditions, setConditions] = useState([])
  const {key} = useParams();

  const firstElement = ( day ) =>{
    return (day === conditions.entries().next().value[1])
  }
  
  const searchForecast = async(code) =>{
    try{
      const api = await fetch("http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/"+code+"?apikey="+API_KEY+"&language="+lang+"&details=false&metric=true")
      const response = await api.json()
      if (response.size === 0){
        console.log("no hay resultados")
      }
      const resp = response.filter((response, id) => id <5)
      setConditions(resp)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    if(key){
      searchForecast(key)
    }
    else{
      searchForecast('7894')
    }
  },[key])
  
  return (
    <div className="flex flex-col rounded-md bg-white text-black overflow-hidden shadow-lg pb-2">
      <p className="p-3 font-semibold text-xl">Pronóstico por hora</p>
      <div className="flex grid grid-cols-5 gap-5">
        {conditions.map((day) => (
          
          <div key={day.DateTime} className={ (firstElement(day) ? "font-bold " : "font-semibold " ) + styles.col}>
            <h2 className="text-xl leading-normal">{ firstElement(day) ? 'Ahora' : day.DateTime.slice(11, 16)}</h2>
            <div>
              <p className="text-4xl text-blue-600">{Math.trunc(day.Temperature.Value)}°</p>
            </div>
            { day.WeatherIcon ?  
              <img className="w-full drop-shadow-2xl w-20" src={require("../assets/img/accuweatherIcons/"+day.WeatherIcon+".png")} alt="Conditions"/>
                :   
              <img className="w-full drop-shadow-2xl w-20" src={require("../assets/img/accuweatherIcons/"+7+".png")} alt="Conditions not found"/>
            }
           
            <div className="flex flex-row mx-auto">
              <svg className="w-2" viewBox="0 -2 5 10">
                <path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z" fill="#6adef8"></path>
              </svg>
              <p className="px-2 text-lg leading-loose">{day.PrecipitationProbability}%</p>
            </div>
          </div>
        ))}
      </div>
     </div>
  )
}
    
export default CardForecast;