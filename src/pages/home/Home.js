import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h1 className="heading-section">Bienvenido</h1>
                        <h2 className="heading-section">Seleccione el modo de juego</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 col-lg-5">
                        <div className="wrap d-md-flex">
                            <div className="options-wrap p-4 p-lg-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <Link to="/local_Match">
                                            <button type="button" className="btn btn-primary">Juego Local</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
