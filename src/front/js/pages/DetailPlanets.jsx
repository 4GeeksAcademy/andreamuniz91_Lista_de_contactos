import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";


export const DetailPlanets = () => {
const {store, actions} = useContext(Context)
const [item, setItem] = useState(store.currentPlanets.properties)


    return (
      <div className="container text-center text-dark">
            <div className="row">
                
                    <div  className="col-lg-4 col-md-6 col-sm-10 mb-3">
                        <div className="card my-4">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p>climate: {item.climate}</p>
                                <p>diameter: {item.diameter}</p>
                                <p>population: {item.population}</p>
                                <p>terrain: {item.terrain}</p>
                                <p>url: {item.url}</p>
                                <p>gravity: {item.gravity}</p>
                                <p>orbital_period: {item.orbital_period}</p>
                                <p>rotation_period: {item.rotation_period}</p>
                                <p>created: {item.created}</p>   
                            </div>
                            <img height="280" src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanets.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body d-flex justify-content-between align-items-end">
                            
                              
                            </div>
                        </div>
                    </div>
           
            </div>
        </div> 
    )
  }

