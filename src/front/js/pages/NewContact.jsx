import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const NewContact = () => {
    const { store, actions } = useContext(Context);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ address, setAddress ] = useState('');
    const navigate = useNavigate()

    const crearContacto = async (event) => {
        event.preventDefault()
        const newContact = {
            name,
            email,
            phone,
            address,
        };   
        await actions.crearContacto(newContact);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        navigate("/contact-list")
    };
    
    return (
        <div className="className container mt-3">
        <form onSubmit={crearContacto}>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Nombre completo</label>
                <input type="text" className="form-control" onChange={(event) =>setName(event.target.value)} id="inputName"/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="text" className="form-control" onChange={(event) =>setEmail(event.target.value)} id="inputEmail"/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Teléfono</label>
                <input type="text" className="form-control" onChange={(event) =>setPhone(event.target.value)} id="inputPhone"/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Dirección</label>
                <input type="text" className="form-control" onChange={(event) =>setAddress(event.target.value)} id="inputPhone" />
            </div>
            <div className="mt-3">
                
            <button type="submit" className="btn btn-primary me-2" >Guardar</button>
                
                
            </div>
        </form>
        </div>

    )

}