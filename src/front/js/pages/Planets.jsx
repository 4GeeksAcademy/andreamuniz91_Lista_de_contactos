import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Planets = () => {
const {store, actions} = useContext(Context)
const fetchData = async () => {
   await actions.getPlanets()
}

const handleError = (e) => {
    e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
  
}

useEffect(() => {
    fetchData()
}, []);

    return (
      <div className="container text-center text-white">
            <div className="row">
                {store.planets.map((item, index) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-10 mb-3">
                        <div className="card my-4" style={{ width: "19rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                            </div>
                            <img onError={handleError} height="280" src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body d-flex justify-content-between align-items-end">
                            <button className="btn btn-warning">+Info</button>
                              
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> 
    )
  }

