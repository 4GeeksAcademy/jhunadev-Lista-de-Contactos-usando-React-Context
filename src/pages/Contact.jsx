import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer(); 

    const descargarContactos = () => {
        fetch("https://playground.4geeks.com/contact/agendas/jhunadev/contacts")
            .then(res => {
                if(res.status === 404) {
                    return fetch("https://playground.4geeks.com/contact/agendas/jhunadev", { method: "POST" })
                        .then(() => descargarContactos());
                }
                return res.json();
            })
            .then(data => {
                if(data && data.contacts) {
                    dispatch({ type: "set_contactos", payload: data.contacts });
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        descargarContactos();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Mis Contactos</h1>
                <Link to="/add-contact" className="btn btn-success">
                    Add new contact
                </Link>
            </div>
            
            {store.contactos?.map((contacto) => (
                <ContactCard key={contacto.id} contacto={contacto} />
            ))}
        </div>
    );
};
