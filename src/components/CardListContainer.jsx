import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import CardResume from "./CardResume";
import CardDetail from "./CardDetail";
import CardForecast from "./CardForecast";
import CardAir from "./CardAir";
import CardAllergen from "./CardAllergen";
import { API_KEY, lang } from "../api/api.jsx";
import { Link } from "react-router-dom";
import "../assets/css/Styles.css";

const CardContainer = ( ) => {

  const {key} = useParams();
  const [conditions, setConditions] = useState([])
  const [description, setDescription] = useState({place:"Caballito", city: 'Buenos Aires'})
  const [errorFetch, setError] = useState(false)
  
  const searchConditionsByRegion = async(code) =>{
    try{
      const api = await fetch("http://dataservice.accuweather.com/currentconditions/v1/"+code+"?apikey="+API_KEY+"&language="+lang+"&details=true")
      const response = await api.json()
      if (response.size === 0){
        console.log("no hay resultados")
      }
      const resp = response[0]
      setConditions(
        conditions => 
        ({...conditions, 
        weather: resp.WeatherText,
        weatherIcon: resp.WeatherIcon,
        realFeelTemp: resp.RealFeelTemperature.Metric.Value,
        dewPoint: resp.DewPoint.Metric.Value,
        wind: resp.Wind.Speed.Metric.Value,
        humidity: resp.RelativeHumidity,
        uvIndex: resp.UVIndex,
        pressure: resp.Pressure.Metric.Value,
        todayTemp: resp.Temperature.Metric.Value})
      )
    }
    catch(error) { setError(!errorFetch) }; 
  }

  const searchForecastByRegion = async(code) =>{
    try{
      const api = await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/1day/"+code+"?apikey="+API_KEY+"&language="+lang+"&details=true&metric=true")
      const response = await api.json()
      if (response.size === 0){
        console.log("no hay resultados")
      }
      setConditions(
        conditions => 
        ({...conditions, 
          maxTemp: response.DailyForecasts[0].Temperature.Maximum.Value,
          minTemp: response.DailyForecasts[0].Temperature.Minimum.Value,
          sunRise: response.DailyForecasts[0].Sun.Rise.slice(11, 16),
          sunSet: response.DailyForecasts[0].Sun.Set.slice(11, 16),
          airQuality: response.DailyForecasts[0].AirAndPollen[0].Category,
          airValue: response.DailyForecasts[0].AirAndPollen[0].Value,
          grass: response.DailyForecasts[0].AirAndPollen[1].Category,
        })
      )
    }
    catch(error) { setError(!errorFetch) }; 
  }

  useEffect(()=>{
    if (key){
      const items = JSON.parse(localStorage.getItem('place'));
      if (items){ setDescription(items) }
      searchConditionsByRegion(key)
      searchForecastByRegion(key)
    }
    else {
      searchConditionsByRegion('7894')
      searchForecastByRegion('7894')
    }
  },[key])

  return (
    <div className="grid grid-cols-3 gap-6 max-w-full lg:max-w-7xl mx-20 py-5">
      {errorFetch ? 
        <>
          <div className="inset-0 fixed w-full h-full transparent">
            <div className="container mx-auto md:px-10 my-36 place-self-center ">
              <div className="bg-white px-3 md:px-4 py-12 flex flex-col justify-center items-center rounded-md overflow-hidden shadow-lg">
                <h2 className="text-center md:w-9/12 lg:w-7/12 font-semibold text-lg text-black">La página no se encuentra disponible en este momento</h2>
                <Link to="/" className="mt-6 flex justify-center">
                  <button onClick={() => setError(!errorFetch)} className={ " bg-blue-800 p-3 rounded-lg cursor-pointer"}>
                    Volver al inicio
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
        : 
        <>
          <div className='col-span-2 w-full'>
            <CardResume description={description} location={conditions}/>
          </div>
          <div className='w-full'>
            <CardAir location={conditions}/>
          </div>
          <div className='col-span-2 w-full'>
            <CardDetail description={description} location={conditions}/>
          </div>
          <div className='w-full'>
            <CardAllergen location={conditions}/>
          </div>
          <div className='col-span-2 w-full'>
            <CardForecast/>
          </div>
        </>
      }
     
    </div>
  )
}

export default CardContainer;
