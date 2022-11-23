import { GiHighGrass } from "react-icons/gi";

const CardAllergens = ( { location } ) => {
  
    const styles = {
      moderado: " border-amber-500",
      bueno: " border-lime-400",
      circle: "flex rounded-full border border-4 w-16 h-16 justify-center mt-4",
    }
  
    return (
      <div className="flex flex-col rounded-md bg-white text-black overflow-hidden shadow-lg px-5">
        <h2 className="text-xl drop-shadow-md font-semibold leading-loose pt-2">Actividades y salud</h2>
          <div className="grid grid-cols-3 mx-auto py-3">
            {location.grass === 'Bueno' ? 
              <>
                <div className={(styles.circle) + (styles.bueno)}>
                  <p className="my-auto text-4xl"><GiHighGrass/></p>
                </div>
                <div className="col-span-2 flex flex-col pb-4">
                  <h3 className="text-xl text-neutral-900">Pronóstico de alergias estacionales y recuento de polen</h3>
                  <p className="pt-1 text-neutral-500 text-md leading-snug">No se detectó polen en tu área.</p>
                </div>
              </>
              :
              <>
              <div className={(styles.circle) + (styles.moderado)}>
                <p className="my-auto text-4xl"><GiHighGrass/></p>
              </div>
              <div className="col-span-2 flex flex-col pb-4">
                <h3 className="text-xl text-neutral-900">Pronóstico de alergias estacionales y recuento de polen</h3>
                <p className="pt-1 text-neutral-500 text-md leading-snug">Los niveles de polen del césped en tu área son altos.</p>
              </div>
              </>
            }             
          </div>
       </div>
    )
  }
      
  export default CardAllergens;