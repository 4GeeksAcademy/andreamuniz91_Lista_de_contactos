import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Edit = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState(store.currentContact.name);
    const [email, setEmail] = useState(store.currentContact.email);
    const [phone, setPhone] = useState(store.currentContact.phone);
    const [address, setAddress] = useState(store.currentContact.address);
    const navigate = useNavigate()

    const editContact = (event) => {
        event.preventDefault()
        actions.editarContacto(store.currentContact.id, name, email, phone, address)
        navigate("/contact-list")
    };

    return (
        <div className="className container mt-3">
            <form onSubmit={editContact}>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Nombre completo</label>
                    <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} id="inputName" />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="text" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} id="inputEmail" />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Teléfono</label>
                    <input type="text" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} id="inputPhone" />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Dirección</label>
                    <input type="text" className="form-control" value={address} onChange={(event) => setAddress(event.target.value)} id="inputPhone" />
                </div>
                <div className="mt-3">   
                        <button type="submit" className="btn btn-primary me-2">Guardar</button>
                 
                </div>
            </form>
        </div>
    )
}


