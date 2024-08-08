import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Logout.jsx";
import { Context } from "../store/appContext.js";


export const Navbar = () => {
	const { store, actions } = useContext(Context)

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarsExample05">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{store.isLoged ?
							<>
								<li>
									<Link to="/logout">
										<Logout />
									</Link>
								</li>
							</>
							:
						    <>
							<button type="button" className="btn btn-primary ms-2">
								<Link to="/signup" className="nav-item nav-link d-flex justify-content-end text-dark" aria-current="page">
									Regístrate
								</Link>
							</button>
							<button type="button" className="btn btn-info ms-2">
								<Link to="/login" className="nav-item nav-link d-flex justify-content-end text-dark" aria-current="page">
									Iniciar sesión
								</Link>
							</button>
						   </>
                        }
						<li>
							<Link to="/people" className="nav-item nav-link d-flex justify-content-end" aria-current="page">
								Personajes
							</Link>
						</li>
						<li>
							<Link to="/species" className="nav-item nav-link d-flex justify-content-end" aria-current="page">
								Especies
							</Link>
						</li>
						<li>
							<Link to="/vehiculos" className="nav-item nav-link d-flex justify-content-end" aria-current="page">
								Vehículos
							</Link>
						</li>
						<li>
							<Link to="/planets" className="nav-item nav-link d-flex justify-content-end" aria-current="page">
								Planetas
							</Link>
						</li>
						<li>
							<Link to="/contact-list" className="nav-item nav-link d-flex justify-content-end" aria-current="page">
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
