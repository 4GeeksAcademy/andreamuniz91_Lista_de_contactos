import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Home } from "./Home.jsx";
import { useNavigate } from "react-router-dom";


export const Dashboard = () => {
  const { store } = useContext(Context)
  const navigate = useNavigate()

const handleDashboard = () => {
  navigate("/")
}

  return (
    !store.currentUser ? 
      <Home/>
    :
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{store.currentUser.email}</h2>
            <p className="card-text">Estas logeado</p>
            <button href="#" onClick={handleDashboard} className="btn btn-primary">Inicio</button>
          </div>
        </div>
      </div>
  )
}