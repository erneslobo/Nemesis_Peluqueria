import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/registro.scss";

export const Registro = () => {
	return (
		<>
			<div className="mega ">
				<div className="container box">
					<div id="div1">
						<h4>Registrarse</h4>
						<div className="mb-3">
							<input type="email" className="form-control" placeholder="Email" />
						</div>
						<div className="mb-3">
							<input type="password" className="form-control" placeholder="Contraseña" />
							<p>* La contraseña debe tener entre 6 y 8 caracteres</p>
						</div>
						<div className="col-auto">
							<button type="submit" className="btn btn-dark mb-3">
								Registrarse
							</button>
						</div>
						<Link to={`/login`}>{"Iniciar sesion"}</Link>
					</div>
				</div>
			</div>
		</>
	);
};
