const getState = ({ getStore, getActions, setStore }) => {
	const URL_BASE = "https://3001-sapphire-weasel-sb8nj8yz.ws-us18.gitpod.io/api/";
	const WEB_URL_BASE = "https://3000-sapphire-weasel-sb8nj8yz.ws-us18.gitpod.io";
	return {
		store: {
			message: null,
			usuario_creado: false,
			usuario_autenticado: false,
			correo_password_enviado: false,
			password_actualizado: false,
			muestras: [],

			/* 
			El objeto 'usuario_actual' tiene los datos del usuario que esta 
			autenticado en un momento dado. Tiene la siguiente forma:

			"usuario_actual": {
				"admin": true,
				"apellido": "ADMIN",
				"email": "admin@admin.com",
				"id": 1,
				"nombre": "ADMIN",
				"telefono": "4343423432"
			}
			*/
			usuario_actual: {},

			prod_y_serv: []
		},
		actions: {
			obtener_muestras: () => {
				if (localStorage.getItem("muestras") == null) {
					let requestOptions = {
						method: "GET",
						redirect: "follow"
					};
					fetch(`${URL_BASE}muestras`, requestOptions)
						.then(response => response.json())
						.then(result => {
							console.log(result);
							setStore({ muestras: result });
							localStorage.setItem("muestras", JSON.stringify(result));
						})
						.catch(error => console.log("error", error));
				} else {
					console.log(JSON.parse(localStorage.getItem("muestras")));
					setStore({ muestras: JSON.parse(localStorage.getItem("muestras")) });
				}
			},

			cambiar_password: (password, token) => {
				let myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${token}`);
				myHeaders.append("Content-Type", "application/json");

				let raw = JSON.stringify({
					password: password
				});

				let requestOptions = {
					method: "PUT",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(`${URL_BASE}usuario`, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log(result);
						setStore({ password_actualizado: true });
					})
					.catch(error => console.log("error", error));
			},

			/*
			   *********************** RECUPERAR PASSWORD ***********************

			Integracion para enviar emails para recuperar contraseña
			en el body se ocupa enviar los siguientes parametros en un formato JSON
				{
					service_id: id del email service que se crea en emailjs.com,
					template_id: id del Email Template que se crea en emailjs.com,
					user_id: id que se genera en emailjs.com en la seccion de integracion,
					template_params: {
						from_name: "Nemesis Peluqueria",
						to_name: "Ernesto",
						to_email: email,
						message: "please access this link to recover your password"
						passwordUrl: `${WEB_URL_BASE}/reset_password`,
						token: result.access_token
					}
				}

			*/
			recuperarPassword: email => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				let raw = JSON.stringify({
					email: email
				});

				let requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(`${URL_BASE}password_reset`, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log(encodeURIComponent(result.access_token));

						raw = JSON.stringify({
							service_id: process.env.EMAIL_SERVICE_ID,
							template_id: process.env.EMAIL_TEMPLATE_ID,
							user_id: process.env.EMAIL_USER_ID,
							template_params: {
								from_name: "Nemesis Peluqueria",
								to_name: "Ernesto",
								to_email: email,
								message: "please access this link to recover your password",
								passwordUrl: `${WEB_URL_BASE}/reset_password`,
								token: result.access_token
							}
						});

						requestOptions = {
							method: "POST",
							headers: myHeaders,
							body: raw,
							redirect: "follow"
						};

						return fetch("https://api.emailjs.com/api/v1.0/email/send", requestOptions);
					})
					.then(response => response.json())
					.then(result => {
						console.log(result);
						setStore({ correo_password_enviado: true });
					})
					.catch(error => console.log("error", error));
			},

			// *********************** REGISTRO ***********************
			registro: (nombre, apellido, telefono, email, password, admin) => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				let raw = JSON.stringify({
					nombre: nombre,
					apellido: apellido,
					telefono: telefono,
					email: email,
					password: password,
					admin: admin
				});

				let requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(`${URL_BASE}registro`, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log(result);
						setStore({ usuario_creado: true });
					})
					.catch(error => console.log("error", error));
			},

			// *********************** LOGIN ***********************
			login: (email, password) => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				let raw = JSON.stringify({
					email: email,
					password: password
				});

				let requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(`${URL_BASE}login`, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log(result);
						if (result.access_token) {
							localStorage.setItem("Token", result.access_token);
							setStore({ usuario_autenticado: true });
							setStore({ usuario_actual: result.user });
						}
					})
					.catch(error => console.log("error", error));
			}

			// *********************** TRAER PRODUCTOS Y SERVICIOS ***********************
			//WIP
			// getProductosYServicios: () => {
			// 	fetch(`${URL_BASE}productos`)
			// 		.then(res => res.json())
			// 		.then(result => {
			// 			setStore({ prod_y_serv: result.all_productos });
			// 			console.log(prod_y_serv);
			// 		})
			// 		.catch(err => console.error(err));
			// }
		}
	};
};

export default getState;
