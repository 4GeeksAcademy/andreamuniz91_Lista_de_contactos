import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Logout.jsx";
import { Context } from "../store/appContext.js";


export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const [favorites, setFavorites] = useState([]);
	const handleLogout = () => {
		actions.logout();
	};
	const handleFavourites = async(favourite) =>{
        const token = localStorage.getItem('token');
        // Imprimir el token en la consola
        console.log(token);
        const dataToSend = {
            "item": favourite,
        };
        // 1. fetch al /api/login enviando en el body el dataToSend
        const uri = process.env.BACKEND_URL + '/api/favorites'
        const options = {
            method: 'GET',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        console.log(dataToSend, localStorage.getItem('access_token'));
        const response = await fetch(uri, options)
        if (!response.ok) {
            // Tratamos el error
            console.log('Error: ', response.status, response.statusText);
            if (response.status == 401) {
                const data = await response.json()
                console.log("Error: " + response.status + response.statusText)
            }
            else if(response.status == 409){
                console.log("El favorito ya existe");
            }
            return
        }
    }
	useEffect(() => {
		console.log(store.favorites)
	}, [store.favorites]);

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
						<ul className="navbar-nav mb-2 mb-lg-0">
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									onClick={handleFavourites}
								>
									Favoritos
								</a>
								<ul className="dropdown-menu dropdown-menu-end bg-warning">
									{store.favorites.length === 0 ? (
										<li className="dropdown-item">No hay favoritos</li>
									) : (
										store.favorites.map((item, index) => (
											<li
												key={index}
												className="dropdown-item d-flex justify-content-between align-items-center"
											>
												{item}
												<i
													className="fas fa-trash-alt"
													onClick={() => removeFavorite(item)}
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
