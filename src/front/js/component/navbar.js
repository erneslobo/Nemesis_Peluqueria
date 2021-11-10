import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import nemesis_logo_sn from "../../img/nemesis_texto_sn_blanco.png";
import "../../styles/navbar.scss";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid fondo">
			<div className="container">
				<nav className="navbar navbar-expand-lg miNavBar">
					<div className="container-fluid">
						<Link to="/" className="navbar-brand link">
							<img src={nemesis_logo_sn} alt="" />
						</Link>

						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarTogglerDemo02"
							aria-controls="navbarTogglerDemo02"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<Link to="/servicios/" className="link">
									<li className="nav-item mx-2">Servicios</li>
								</Link>
								<Link to="/productos/" className="link">
									<li className="nav-item mx-2">Productos</li>
								</Link>
								<Link to="/contacto/" className="link">
									<li className="nav-item mx-2">Contacto</li>
								</Link>
								<Link to="/trabajos/" className="link">
									<li className="nav-item text-nowrap mx-2">Nuestro trabajo</li>
								</Link>
								<li className="nav-item mx-2">
									{/* Renderiza distinto según si el usuario esta autenticado */}
									{!store.usuario_autenticado ? (
										<Link to="/login/" className="link">
											<button type="button" className="btn boton px-4 py-1">
												Ingresar
											</button>
										</Link>
									) : (
										<div className="dropdown ">
											<button
												className="btn boton px-4 py-1 dropdown-toggle"
												type="button"
												id="dropdownMenuButton1"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												{store.usuario_actual.nombre}
											</button>
											<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
												<Link to="/#/" className="link-drop">
													<li className="dropdown-item">Mis Favoritos</li>
												</Link>
												{store.usuario_actual.admin ? (
													<Link to="/#/" className="link-drop">
														<li className="dropdown-item">Admin</li>
													</Link>
												) : null}
												<hr className="py-0 my-1" />
												<Link to="/#/" className="link-drop">
													<li className="dropdown-item">Sign out</li>
												</Link>
											</ul>
										</div>
									)}
								</li>
								<Link to="/checkout/" className="link">
									<li className="nav-item mx-2 carrito">
										<i className="fa fa-shopping-cart" aria-hidden="true" />
									</li>
								</Link>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};
