import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const People = () => {
const {store, actions} = useContext(Context)
const fetchData = async () => {
   await actions.getPersonajes()
}

useEffect(() => {
    fetchData()
}, []);

    return (
        <div className="container">
            <Link to="/people">
            <button className="btn btn-primary mt-4"></button>
            </Link>
            {store.characters && store.characters.map((item) =>(
            <div className="card col-3" key={item.id}>           
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p>{item.email}</p>
                        <p>{item.phone}</p>
                        <p>{item.address}</p>
                    </div>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button className="btn btn-primary" onClick={() => handleEdit(item)} >
                        <i className="text-primary fas fa-pencil-alt"></i>
                    </button>
            </div>
            ))}
        </div>
    )


}