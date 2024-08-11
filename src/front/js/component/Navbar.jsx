import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Logout.jsx";
import { Context } from "../store/appContext.js";


export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const [favorites, setFavorites] = useState([]);
	const userLogin = store.isLoged
	const token = localStorage.getItem('token');
	const handleLogout = () => {
		actions.logout();
	};
	const removeFavourites = async (item) => {
		const uri = process.env.BACKEND_URL + '/api/favorites';
		const options = {
			method: 'DELETE',
			body: JSON.stringify({"item": item}),
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};
		const response = await fetch(uri, options);
		if(!response.ok){
			console.log('Error', response.status, response.statusText);
		}
		if(response == 201){
			console.log("Correcto");
			
		}
		console.log('Favorito eliminado correctamente');
		favourite();
	}
	const favourite = async () => {
		const uri = process.env.BACKEND_URL + '/api/favorites';
		const options = {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};
			try {
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data)
				setFavorites(data.results);
			} catch (error) {
				console.log('Eroor fecth', error);
				return;
			}
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarsExample05">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{store.isLoged ?
							<>
								<Link to="/">
									<button className="btn btn-primary ms-2" onClick={handleLogout}>Logout</button>
								</Link>
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
						<ul className="navbar-nav mb-2 mb-lg-0" onClick={() => favourite()}>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
									aria-expanded="false">
									Favoritos
								</a>
								<ul className="dropdown-menu dropdown-menu-end bg-warning">
									{ !favorites ? (
										<li className="dropdown-item">No hay favoritos</li>
									) : (
										favorites.map((item, index) => (
											<li
												key={index}
												className="dropdown-item d-flex justify-content-between align-items-center"
											>
												{item.item}
												<i
													className="fas fa-trash-alt"
													onClick={() => removeFavourites(item.item)}
													style={{ cursor: 'pointer' }}
												></i>
											</li>
										))
									)}
								</ul>
							</li>
						</ul>
					</ul>
				</div>
			</div>
		</nav>
	);
};
