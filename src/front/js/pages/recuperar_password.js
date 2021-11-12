import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.scss";

export const Recuperar_Password = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");

	const recuperar_password = () => {
		actions.recuperarPassword(email);
	};

	return (
		<>
			{store.correo_password_enviado ? (
				<div className="mega ">
					<div className="container box">
						<div id="div1">
							<h4>Correo Enviado exitosamente a {email} </h4>
						</div>
					</div>
				</div>
			) : (
				<div className="mega ">
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
				</div>
			)}
			;
		</>
	);
};
