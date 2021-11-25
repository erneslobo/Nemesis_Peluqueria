import React, { useState, useEffect, useContext } from "react";
import { Alerta } from "../component/alerta";
import { Context } from "../store/appContext";
import { Link, Redirect, useHistory } from "react-router-dom";
import "../../styles/registro.scss";

export const Registro = () => {
	const { store, actions } = useContext(Context);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [numero, setNumero] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password1, setPassword1] = useState("");
	const history = useHistory();

	const guardar = e => {
		actions.registro(nombre, apellido, numero, email, password, false);
	};

	const irLogin = () => {
		actions.cambiar_usuario_creado_false();
		history.push("/login");
	};

	return (
		<>
			{store.usuario_creado ? (
				irLogin()
			) : (
				<div className="mega position-relative">
					<div className="container box">
						<div id="div1">
							<h4>Registrarse</h4>
							<div className="mb-3" id="nombreCompleto">
								<input
									type="text"
									className="form-control"
									placeholder="Nombre"
									onChange={e => setNombre(e.target.value)}
									value={nombre}
								/>
								<input
									type="text"
									className="form-control"
									placeholder="Apellido"
									onChange={e => setApellido(e.target.value)}
									value={apellido}
								/>
							</div>
							<div className="mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Número de Teléfono"
									onChange={e => setNumero(e.target.value)}
									value={numero}
								/>
							</div>
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
							<div className="col-auto">
								<button
									type="submit"
									className="btn btn-dark mb-3"
									onClick={e => {
										password == password1
											? guardar()
											: actions.mostrar_password_no_iguales_alerta(true);
									}}>
									Registrarse
								</button>
							</div>
							<Link to={`/login`}>{"Iniciar sesion"}</Link>
						</div>
					</div>
					<Alerta alerta={store.password_no_iguales_alerta} mensaje="Password no coinciden!" />
					<Alerta alerta={store.usuario_existe_alerta} mensaje="Usuario ya existe!" />
				</div>
			)}
		</>
	);
};
