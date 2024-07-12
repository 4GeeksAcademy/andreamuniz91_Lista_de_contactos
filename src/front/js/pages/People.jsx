import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const People = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const fetchData = async () => {
        await actions.getPersonajes()
    }
    const handleDetail = async (uid) => {
        await actions.currentPersonaje(uid)
        navigate("/detail-people")
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="container text-center text-dark">
            <div className="row">
                {store.personajes.map((item, index) => (
                    <div key={index.uid} className="col-lg-4 col-md-6 col-sm-10 mb-3">
                        <div className="card my-4" style={{ width: "19rem" }}>
                            <img height="280" src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body d-flex justify-content-between align-items-end">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                </div>
                                <a onClick={() => handleDetail(item.uid)} className="btn btn-warning">+Info</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

