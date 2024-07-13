import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const DetailVehiculos = () => {
const {store, actions} = useContext(Context)
const navigate = useNavigate()

const [item, setItem] = useState(store.currentVehiculo.properties)


    return (
      <div className="container text-center text-dark">
            <div className="row">
                
                    <div  className="col-lg-4 col-md-6 col-sm-10 mb-3">
                        <div className="card my-4">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p>cargo_capacity: {item.cargo_capacity}</p>
                                <p>consumables: {item.consumables}</p>
                                <p>cost_in_credits: {item.cost_in_credits}</p>
                                <p>crew: {item.crew}</p>
                                <p>death_star_class: {item.death_star_class}</p>
                                <p>description: {item.description}</p>
                                <p>driver: {item.driver}</p>
                                <p>films: {item.films}</p>
                                <p>hyperdrive_rating: {item.hyperdrive_rating}</p>
                                <p>id: {item.id}</p>
                                <p>manufacturer: {item.manufacturer}</p>
                                <p>length: {item.length}</p>
                                <p>max_atmosphering_speed: {item.max_atmosphering_speed}</p>
                                <p>max_temp: {item.max_temp}</p>
                                <p>min_temp: {item.min_temp}</p>                   
                            </div>
                            <img height="280" src={`https://starwars-visualguide.com/assets/img/vehicles/${store.currentVehiculo.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body d-flex justify-content-between align-items-end">            
                            </div>
                        </div>
                    </div>
           
            </div>
        </div> 
    )
  }

