import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Alerta } from "../component/alerta";
import { Context } from "../store/appContext";
import "../../styles/login.scss";

export const Recuperar_Password = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const history = useHistory();

	const recuperar_password = () => {
		actions.recuperarPassword(email);
	};

	const volverLogin = () => {
		history.push("/login");
	};

	return (
		<>
			{store.correo_password_enviado ? (
				<div className="mega position-relative">
					<div className="container box">
						<div id="div1">
							<h4>Correo Enviado exitosamente a {email} </h4>
							<div className="col-auto">
								<button type="submit" className="btn btn-dark mb-3" onClick={volverLogin}>
									Volver Login Page
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="mega position-relative">
					<div className="container box">
						<div id="div1">
							<h4>Recuperar Password</h4>
							<div className="mb-3">
								<input
									type="email"
									className="form-control"
									placeholder="Email"
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</div>
							<div className="col-auto">
								<button type="submit" className="btn btn-dark mb-3" onClick={recuperar_password}>
									Enviar email
								</button>
							</div>
						</div>
					</div>
					<Alerta alerta={store.correo_enviado_error_alerta} mensaje="Email incorrecto!" />
				</div>
			)}
			;
		</>
	);
};
