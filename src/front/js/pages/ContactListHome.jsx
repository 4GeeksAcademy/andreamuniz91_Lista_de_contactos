import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";

export const ContactListHome = () => {
const {store, actions} = useContext(Context)
const fetchData = async () => {
   await actions.getContacts()
}
useEffect(() => {
    fetchData()
}, []);

    return (
        <div className="container">
            {store.contactos && store.contactos.map((item) =>(
            <div className="card col-3" key={item.id}>           
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p>{item.email}</p>
                        <p>{item.phone}</p>
                        <p>{item.address}</p>
                    </div>
                    <button className="btn btn-danger" onClick={() => actions.deleteContact(item.id)}>🗑</button>
            </div>
            ))}
        </div>
    )


}