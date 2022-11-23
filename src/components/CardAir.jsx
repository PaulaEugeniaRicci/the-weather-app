const CardAir = ( { location } ) => {
  
  const styles = {
    moderado: " border-amber-500",
    bueno: " border-lime-400",
    circle: "flex rounded-full border border-4 w-16 h-16 justify-center mt-4",
  }

  return (
    <div className="flex flex-col rounded-md bg-white text-black overflow-hidden shadow-lg px-5 h-full">
      <h2 className="text-xl drop-shadow-md uppercase font-semibold leading-loose pt-2">índice calidad del aire</h2>
        <div className="grid grid-cols-3 mx-auto py-3">
          {location.airQuality === 'Bueno' ? 
            <>
              <div className={(styles.circle) + (styles.bueno)}>
                <p className="my-auto text-3xl">{location.airValue}</p>
              </div>
              <div className="col-span-2 flex flex-col pb-4">
                <h3 className="text-xl text-neutral-900">{location.airQuality}</h3>
                <p className="pt-1 text-neutral-500 text-md leading-snug">La calidad del aire se considera satisfactoria y la contaminación atmosférica representa un riesgo escaso o nulo.</p>
              </div>
            </>
            :
            <>
            <div className={(styles.circle) + (styles.moderado)}>
              <p className="my-auto text-4xl">{location.airValue}</p>
            </div>
            <div className="col-span-2 flex flex-col pb-4">
              <h3 className="text-xl text-neutral-900">{location.airQuality}</h3>
              <p className="pt-1 text-neutral-500 text-md leading-snug">La calidad del aire es aceptable, aunque puede existir un riesgo de salud moderado con algunos contaminantes para una cantidad muy reducida de personas sensibles.</p>
            </div>
            </>
          }      
        </div>
     </div>
  )
}
    
export default CardAir;