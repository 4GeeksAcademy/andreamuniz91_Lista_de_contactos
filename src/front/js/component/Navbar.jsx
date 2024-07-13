import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const {store, actions } = useContext(Context);
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
							<Link to="/people" className="nav-link fs-4 d-flex justify-content-end" aria-current="page">
							Personajes
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/species" className="nav-link fs-4 d-flex justify-content-end" aria-current="page">
							Especies
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/vehiculos" className="nav-link fs-4 d-flex justify-content-end" aria-current="page">
							 Vehículos
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/planets" className="nav-link fs-4 d-flex justify-content-end" aria-current="page">
							Planetas
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/contact-list" className="nav-link fs-4" aria-current="page">
							Contact List
							</Link>
						</li>
						<li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" data-bs-toggle="dropdown" aria-expanded="false">Favoritos</Link>
                                <ul className="dropdown-menu">
                                    {store.favorite.map((index, id) =>
                                        <li key={id}>
											{index}
                                            <button onClick={() => actions.removeFavorite(id)} className="dropdown-item">
                                            <i className="fa fa-trash text-end"></i>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </li>
					</ul>					
				</div>
			</div>
		</nav>
	);
};
