import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const DetailSpecies = () => {
const {store, actions} = useContext(Context)
const navigate = useNavigate()
const [item, setItem] = useState(store.currentSpecies.properties)


    return (
      <div className="container text-center text-dark">
            <div className="row">
                
                    <div  className="col-lg-4 col-md-6 col-sm-10 mb-3">
                        <div className="card my-4">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p>average_height: {item.average_height}</p>
                                <p>average_lifespan: {item.average_lifespan}</p>
                                <p>eye_colors: {item.eye_colors}</p>
                                <p>hair_colors: {item.hair_colors}</p>
                                <p>skin_colors: {item.skin_colors}</p>
                                <p>language: {item.language}</p>
                                <p>url: {item.url}</p>
                                <p>created: {item.created}</p>
                                <p>edited: {item.edited}</p>
                                <p>population: {item.population}</p>
                                <p>species: {item.species}</p>
                                <p>classification: {item.classification}</p>
                                <p>designation: {item.designation}</p>
                                <p>period_of_life: {item.period_of_life}</p>
                                <p>gender: {item.gender}</p>
                            </div>
                            <img height="280" src={`https://starwars-visualguide.com/assets/img/species/${store.currentSpecies.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body d-flex justify-content-between align-items-end">
                            
                              
                            </div>
                        </div>
                    </div>
           
            </div>
        </div> 
    )
  }

