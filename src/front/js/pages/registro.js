import React, { useState, useContext } from "react";
import { Alerta } from "../component/alerta";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import "../../styles/registro.scss";

export const Registro = () => {
	const { store, actions } = useContext(Context);
	const [nombre, setNombre] = useState("");
	const [validNombre, setValidNombre] = useState(true);
	const [apellido, setApellido] = useState("");
	const [validApellido, setValidApellido] = useState(true);
	const [numero, setNumero] = useState("");
	const [validNumero, setValidNumero] = useState(true);
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(true);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(true);
	const [password1, setPassword1] = useState("");
	const [validPassword1, setValidPassword1] = useState(true);
	const history = useHistory();

	const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	const telefonoRegex = /^((09[1-9](\s?)([0-9]{3})(\s?)([0-9]{3}))|((2|4)(\s?)([0-9]{3})(\s?)([0-9]{2})(\s?)([0-9]{2})))$/g;

	const validarNombre = e => {
		const nombre = e.target.value;
		setNombre(e.target.value);
		if (nombre.length > 0) {
			setValidNombre(true);
		} else {
			setValidNombre(false);
		}
	};

	const validarApellido = e => {
		const apellido = e.target.value;
		setApellido(e.target.value);
		if (apellido.length > 0) {
			setValidApellido(true);
		} else {
			setValidApellido(false);
		}
	};

	const validarTelefono = e => {
		const tel = e.target.value;
		setNumero(e.target.value);
		if (telefonoRegex.test(tel) || tel == "") {
			setValidNumero(true);
		} else {
			setValidNumero(false);
		}
	};

	const validarEmail = e => {
		const email = e.target.value;
		setEmail(e.target.value);
		if (emailRegex.test(email)) {
			setValidEmail(true);
		} else {
			setValidEmail(false);
		}
	};

	const validarPassword = e => {
		const pass = e.target.value;
		setPassword(e.target.value);
		if (pass.length > 0) {
			setValidPassword(true);
		} else {
			setValidPassword(false);
		}
	};

	const validarPassword1 = e => {
		const pass1 = e.target.value;
		setPassword1(e.target.value);
		if (pass1.length > 0 && pass1 == password) {
			setValidPassword1(true);
		} else {
			setValidPassword1(false);
		}
	};

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
									onChange={e => validarNombre(e)}
									value={nombre}
								/>
								<input
									type="text"
									className="form-control"
									placeholder="Apellido"
									onChange={e => validarApellido(e)}
									value={apellido}
								/>
								<p className="inputAlert">
									{!(validNombre && validApellido) && "Nombre o Apellido inválido"}
								</p>
							</div>
							<div className="mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Número de Teléfono"
									onChange={e => validarTelefono(e)}
									value={numero}
								/>
								<p className="inputAlert">{!validNumero && "Numero de teléfono inválido"}</p>
							</div>
							<div className="mb-3">
								<input
									type="email"
									className="form-control"
									placeholder="Email"
									onChange={e => validarEmail(e)}
									value={email}
								/>
								<p className="inputAlert">{!validEmail && "Email inválido"}</p>
							</div>
							<div className="mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
									onChange={e => validarPassword(e)}
									value={password}
								/>
								<p className="inputAlert">{!validPassword && "Contraseña inválida o no coinciden"}</p>
							</div>
							<div className="mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Repetir contraseña"
									onChange={e => validarPassword1(e)}
									value={password1}
								/>
								<p className="inputAlert">{!validPassword1 && "Contraseña inválida o no coinciden"}</p>
							</div>
							<div className="col-auto">
								<button
									type="submit"
									className="btn btn-dark mb-3"
									disabled={
										validNombre &&
										validApellido &&
										validEmail &&
										validPassword &&
										validPassword1 &&
										(nombre != "" &&
											apellido != "" &&
											email != "" &&
											password != "" &&
											password1 != "")
											? false
											: true
									}
									onClick={e => guardar()}>
									Registrarse
								</button>
							</div>
							<Link to={`/login`}>{"Iniciar sesión"}</Link>
						</div>
					</div>
					<Alerta alerta={store.usuario_existe_alerta} mensaje="Usuario ya existe!" tipoAlerta="danger" />
				</div>
			)}
		</>
	);
};
