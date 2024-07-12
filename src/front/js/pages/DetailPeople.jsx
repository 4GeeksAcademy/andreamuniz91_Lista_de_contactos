import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";


export const DetailPeople = () => {
const {store, actions} = useContext(Context)
const [item, setItem] = useState(store.currentPersonaje.properties)

const fetchData = async () => {
   await actions.getDetailPeople()
}

useEffect(() => {
    fetchData()
}, []);

    return (
      <div className="container text-center text-white">
            <div className="row">
                
                    <div  className="col-lg-4 col-md-6 col-sm-10 mb-3">
                        <div className="card my-4" style={{ width: "19rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
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

