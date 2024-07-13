import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";


export const DetailPeople = () => {
const {store, actions} = useContext(Context)
const [item, setItem] = useState(store.currentPersonaje.properties)

/* const fetchData = async () => {
   await actions.getDetailPeople()
}

useEffect(() => {
    fetchData()
}, []);
 */
    return (
      <div className="container text-center text-white">
            <div className="row">
                
                    <div  className="col-lg-4 col-md-6 col-sm-10 mb-3">
                        <div className="card my-4" style={{ width: "19rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p>birth_year: {item.birth_year}</p>
                                <p>eye_color: {item.eye_color}</p>
                                <p>gender: {item.gender}</p>
                                <p>hair_color: {item.hair_color}</p>
                                <p>height: {item.height}</p>
                                <p>mass: {item.mass}</p>
                                <p>skin_color: {item.skin_color}</p>
                                <p>url: {item.url}</p>
                            </div>
                            <img height="280" src={`https://starwars-visualguide.com/assets/img/characters/${store.currentPersonaje.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body d-flex justify-content-between align-items-end">
                            
                              
                            </div>
                        </div>
                    </div>
           
            </div>
        </div> 
    )
  }

