import "../assets/css/Styles.css";

const CardResume = ( { description, location } ) => {
  
  const styles = {
    details: "text-2xl leading-thight py-1 drop-shadow-md",
  }

  return (
    <div className="flex flex-col select-none rounded-md gradient evening overflow-hidden shadow-lg h-full">
      <h2 className="transparent p-3 text-xl drop-shadow-lg">
        {description.place}, {description.city}, {description.country}
      </h2>
      <div className="flex flex-row justify-between px-4">
        <div className="flex flex-col pb-4">
          <p className={(styles.details)+" text-8xl"}>{location.todayTemp}°</p>
          <p className={styles.details}>{location.weather}</p>
          <p className="text-2xl drop-shadow-md font-bold">Día {location.maxTemp}° • Noche {location.minTemp}°</p>
        </div>
        <div className="my-auto">
          {
            location.weatherIcon ?  
            <img className="w-full drop-shadow-2xl w-44" src={require("../assets/img/accuweatherIcons/"+location.weatherIcon+".png")} alt="Conditions"/>
              :   
            <img className="w-full drop-shadow-2xl w-44" src={require("../assets/img/accuweatherIcons/"+7+".png")} alt="Conditions not found"/>
          }
        </div>
      </div>
     </div>
  )
}
    
export default CardResume;