import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.scss";

export const Login = () => {
	return (
		<>
			<div className="mega ">
				<div className="container box">
					<div id="div1">
						<h4>Ingresar</h4>
						<div className="mb-3">
							<input type="email" className="form-control" placeholder="Email" />
						</div>
						<div className="mb-3">
							<input type="password" className="form-control" placeholder="Contraseña" />
							<Link to={`/registrarse`} id="CrearUsuario">
								{"¿Olvidaste tu contraseña?"}
							</Link>
						</div>
						<div className="col-auto">
							<button type="submit" className="btn btn-dark mb-3">
								Ingresar
							</button>
						</div>
						<Link to={`/registro`}>{"Crear una cuenta nueva"}</Link>
					</div>
				</div>
			</div>
		</>
	);
};
