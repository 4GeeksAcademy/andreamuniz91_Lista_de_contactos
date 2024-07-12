import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Proyectos Andrea</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarsExample05">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/people">
							<a className="nav-link fs-4 d-flex justify-content-end" aria-current="page">StarWars</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/contact-list">
							<a className="nav-link fs-4" aria-current="page">Contact List</a>
							</Link>
						</li>
					</ul>					
				</div>
			</div>
		</nav>
	);
};
