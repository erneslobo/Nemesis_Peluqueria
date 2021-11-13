import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const ingresar = () => {
		actions.login(email, password);
	};

	return (
		<>
			{store.usuario_autenticado ? (
				<Redirect to="/" />
			) : (
				<div className="mega ">
					<div className="container box">
						<div id="div1">
							<h4>Ingresar</h4>
							<div className="mb-3">
								<input
									type="email"
									className="form-control"
									placeholder="Email"
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</div>
							<div className="mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
									onChange={e => setPassword(e.target.value)}
									value={password}
								/>
								<Link to={`/recuperar_password`} id="CrearUsuario">
									{"¿Olvidaste tu contraseña?"}
								</Link>
							</div>
							<div className="col-auto">
								<button type="submit" className="btn btn-dark mb-3" onClick={ingresar}>
									Ingresar
								</button>
							</div>
							<Link to={`/registro`}>{"Crear una cuenta nueva"}</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
