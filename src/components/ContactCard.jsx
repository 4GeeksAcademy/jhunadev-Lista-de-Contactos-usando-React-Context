import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contacto }) => {
    const { dispatch } = useGlobalReducer();

    const borrarContacto = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/jhunadev/contacts/${contacto.id}`, {
            method: "DELETE"
        })
        .then(res => {
            if(res.ok) {
                fetch("https://playground.4geeks.com/contact/agendas/jhunadev/contacts")
                    .then(r => r.json())
                    .then(data => dispatch({ type: "set_contactos", payload: data.contacts }));
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="card mb-3 mx-auto" style={{ maxWidth: "600px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://picsum.photos/200" className="img-fluid rounded-circle p-3" alt="avatar" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title fw-bold">{contacto.name}</h5>
                            <div>
                                <Link to="/add-contact" state={{ contactoEdit: contacto }}>
                                    <i className="fas fa-pen text-primary me-3" style={{ cursor: "pointer" }}></i>
                                </Link>
                                <i className="fas fa-trash text-danger" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#deleteModal-${contacto.id}`}></i>
                            </div>
                        </div>
                        <p className="card-text mb-1 text-secondary">{contacto.address}</p>
                        <p className="card-text mb-1 text-secondary">{contacto.phone}</p>
                        <p className="card-text mb-1 text-secondary">{contacto.email}</p>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={`deleteModal-${contacto.id}`} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content text-dark">
                        <div className="modal-header">
                            <h5 className="modal-title">¿Estás seguro?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p>Si borras a <strong>{contacto.name}</strong>, no habrá marcha atrás.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={borrarContacto}>
                                Sí, borrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
