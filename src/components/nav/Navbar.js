import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


export const Navbar = () => {

  return (
    <nav className="navbar navbar-dark navbar-expand-md bg-dark bg-gradient">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Inicio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <div className="navbar-nav-controls">
              <Link className="nav-link" to="/local_Match">
                Juego Local
              </Link>
            </div>
            <div className="navbar-nav-controls">
              <Link className="nav-link" to="/Remote_Match">
                Juego Remoto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
