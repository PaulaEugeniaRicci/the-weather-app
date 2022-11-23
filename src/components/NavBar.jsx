import "../assets/css/Styles.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import { API_KEY, lang } from "../api/api.jsx";

const NavBar = () => {
  
  const styles = {
    logo: "capitalize font-bold leading-none text-sm select-none",
    input: "rounded-full py-1 w-96 focus:outline-none focus:ring-2 focus:ring-white placeholder-white",
    grid: "border-gray-200 border-b py-1 hover:bg-blue-700 hover:cursor-pointer text-gray-600 hover:text-white",
  }

  const [region, setRegion] = useState({input:""})
  const [cities, setCities] = useState([])
  const [select, setSelect] = useState(false)
  
  const handleUpdateInput = (e) => {
    setRegion({ ...region, [e.target.name]: e.target.value })
    if (region.input.length >= 4){ searchRegion() }
  }

  const handleSubmit = (e) => e.preventDefault()

  const handleLink = (city) => {
    localStorage.removeItem('place');
    localStorage.setItem('place', JSON.stringify(city.city));
  }

  const searchRegion = async() =>{
    setSelect(!select)
    try{
      const api = await fetch("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey="+API_KEY+"&q="+region.input+"&language="+lang)
      const response = await api.json()
      if (response.size === 0){
        console.log("no hay resultados")
      }
      else{
        setCities(response.map((city) => ({
          key: city.Key, 
          place: city.LocalizedName,
          city: city.AdministrativeArea.LocalizedName,
          country: city.Country.LocalizedName
        })))
      }
    }
    catch{
      console.log("Error")
    }
  }
  
  return (
    <nav className="evening">
      <div className="mx-auto relative select-none">
        <div className="flex items-center py-4 px-3 mx-6">
          <div className="w-1/3 flex justify-start">
            <div className={(styles.logo) + " flex flex-col bg-white px-2 pt-4 pb-2"}>
              <p>The</p>
              <p>Weather</p>
              <p>App</p>
            </div>
            <p className="my-auto pl-4 text-white">
              <a href='http://www.accuweather.com/' rel="noreferrer" target='_blank'>
                Powered by <span className="font-semibold">AccuWeather</span>
              </a>
            </p>
          </div>
          <div className="w-1/3 flex justify-end flex-col">
            <div>
              <form className="w-full flex justify-end" onSubmit={handleSubmit}>
                <input className={styles.input} type="text" name="input" 
                  onChange={handleUpdateInput} placeholder="Buscar ciudad"
                  onFocus={(e) => e.target.placeholder = ""} 
                  onBlur={(e) => e.target.placeholder = "Buscar ciudad"} 
                />
                <VscSearch className="absolute text-white stroke-1 mr-3 mt-2" size="1.2em"/>
              </form>
            </div>
            
            <div className={ (select ? "block" : "hidden") + " w-full flex justify-end pt-1 z-10"} onMouseLeave={() => setSelect(!select)}>
              <div className="fixed w-96 flex flex-col bg-white rounded-md overflow-hidden shadow-md">
               {cities.map((city) => (
                 <div className={styles.grid} key={city.key}>
                    <Link to={`/${city.key}`} 
                      className="text-sm pl-2 leading-loose" onClick={() => handleLink({city})}>{city.place}, {city.city}, {city.country}</Link>
                  </div>
               ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
    
export default NavBar;