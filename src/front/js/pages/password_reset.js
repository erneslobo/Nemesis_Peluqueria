import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.scss";

export const Reset_Password = () => {
	const { store, actions } = useContext(Context);
	const [password, setPassword] = useState("");
	const [password1, setPassword1] = useState("");
	const [token, setToken] = useState("");

	const cambiar_password = () => {
		actions.cambiar_password(password, token);
	};

	return (
		<>
			{store.password_actualizado ? (
				<div className="mega ">
					<div className="container box">
						<div id="div1">
							<h4>Password actualizado exitosamente!</h4>
						</div>
					</div>
				</div>
			) : (
				<div className="mega ">
					<div className="container box">
						<div id="div1">
							<h4>Cambiar Password</h4>
							<div className="mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
									onChange={e => setPassword(e.target.value)}
									value={password}
								/>
								<p>* La contraseña debe tener entre 6 y 8 caracteres</p>
							</div>
							<div className="mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Repetir contraseña"
									onChange={e => setPassword1(e.target.value)}
									value={password1}
								/>
								<p>* Repetir contraseña</p>
							</div>
							<div className="mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Token"
									onChange={e => setToken(e.target.value)}
									value={token}
								/>
							</div>

							<div className="col-auto">
								<button
									type="submit"
									className="btn btn-dark mb-3"
									onClick={e => {
										password == password1 ? cambiar_password() : alert("Los password no coinciden");
									}}>
									Cambiar
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
