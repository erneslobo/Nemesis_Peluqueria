import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Alerta } from "../component/alerta";
import { Context } from "../store/appContext";
import "../../styles/login.scss";

export const Reset_Password = () => {
	const { store, actions } = useContext(Context);
	const [password, setPassword] = useState("");
	const [password1, setPassword1] = useState("");
	const [token, setToken] = useState("");
	const history = useHistory();

	const cambiar_password = () => {
		actions.cambiar_password(password, token);
	};

	const irLogin = () => {
		actions.cambiar_password_actualizado_false();
		history.push("/login");
	};

	return (
		<>
			{store.password_actualizado ? (
				<div className="mega position-relative">
					<div className="container box">
						<div id="div1">
							<h4>Password actualizado exitosamente!</h4>
							<div className="col-auto">
								<button type="submit" className="btn btn-dark mb-3" onClick={irLogin}>
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
							<h4>Cambiar Password</h4>
							<div className="mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
									onChange={e => setPassword(e.target.value)}
									value={password}
								/>
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
										password == password1
											? cambiar_password()
											: actions.mostrar_password_no_iguales_alerta(true);
									}}>
									Cambiar
								</button>
							</div>
						</div>
					</div>
					<Alerta
						alerta={store.password_no_iguales_alerta}
						mensaje="Password no coinciden!"
						tipoAlerta="danger"
					/>
					<Alerta
						alerta={store.token_invalido_alerta}
						mensaje="Token invalido o expirado!"
						tipoAlerta="danger"
					/>
				</div>
			)}
			;
		</>
	);
};
