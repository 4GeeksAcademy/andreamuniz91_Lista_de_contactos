import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Logout.jsx";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarsExample05">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li>
							<button type="button" className="btn btn-primary ms-2">
								<Link to="/signup" className="nav-item nav-link fs-4 d-flex justify-content-end text-dark" aria-current="page">
									Regístrate
								</Link>
							</button>
						</li>
						<li>
							<button type="button" className="btn btn-info ms-2">
								<Link to="/login" className="nav-item nav-link fs-4 d-flex justify-content-end text-dark" aria-current="page">
									Iniciar sesión
								</Link>
							</button>
						</li>
						{/* <li>
							<button type="button" className="btn btn-danger ms-2">
							<Link to="/logout" className="nav-item nav-link fs-4 d-flex justify-content-end text-dark" aria-current="page">
							Cerrar sesión
							</Link>
							</button>
							</li> */}
						<li>
							<Link to="/people" className="nav-item nav-link fs-4 d-flex justify-content-end" aria-current="page">
								Personajes
							</Link>
						</li>
						<li>
							<Link to="/species" className="nav-item nav-link fs-4 d-flex justify-content-end" aria-current="page">
								Especies
							</Link>
						</li>
						<li>
							<Link to="/vehiculos" className="nav-item nav-link fs-4 d-flex justify-content-end" aria-current="page">
								Vehículos
							</Link>
						</li>
						<li>
							<Link to="/planets" className="nav-item nav-link fs-4 d-flex justify-content-end" aria-current="page">
								Planetas
							</Link>
						</li>
						<li>
							<Link to="/contact-list" className="nav-item nav-link fs-4 d-flex justify-content-end" aria-current="page">
								Contact List
							</Link>
						</li>
							<li>
									<Link to="/logout">
									   <Logout />
									</Link>
							</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
