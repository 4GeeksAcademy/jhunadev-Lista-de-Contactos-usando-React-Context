import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const AddContact = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const contactoAEditar = location.state?.contactoEdit; 

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    useEffect(() => {
        if (contactoAEditar) {
            setNombre(contactoAEditar.name);
            setEmail(contactoAEditar.email);
            setTelefono(contactoAEditar.phone);
            setDireccion(contactoAEditar.address);
        }
    }, [contactoAEditar]);
    
    const guardarDatos = (e) => {
        e.preventDefault(); 
        const paqueteNuevo = { name: nombre, email: email, phone: telefono, address: direccion };

        const url = contactoAEditar 
            ? `https://playground.4geeks.com/contact/agendas/jhunadev/contacts/${contactoAEditar.id}`
            : "https://playground.4geeks.com/contact/agendas/jhunadev/contacts";
            
        const metodo = contactoAEditar ? "PUT" : "POST";

        fetch(url, {
            method: metodo,
            body: JSON.stringify(paqueteNuevo),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(() => navigate("/"))
        .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{contactoAEditar ? "Update contact" : "Add a new contact"}</h1>
            
            <form onSubmit={guardarDatos}>
                <div className="mb-3">
                    <label>Full Name</label>
                    <input type="text" className="form-control" onChange={(e) => setNombre(e.target.value)} value={nombre} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="mb-3">
                    <label>Phone</label>
                    <input type="text" className="form-control" onChange={(e) => setTelefono(e.target.value)} value={telefono} required />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input type="text" className="form-control" onChange={(e) => setDireccion(e.target.value)} value={direccion} required />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mt-2">
                    {contactoAEditar ? "Update" : "Save"}
                </button>
            </form>
            
            <div className="mt-3">
                <Link to="/">or get back to contacts</Link>
            </div>
        </div>
    );
};
