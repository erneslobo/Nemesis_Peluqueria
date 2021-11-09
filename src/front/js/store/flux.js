const getState = ({ getStore, getActions, setStore }) => {
	const URL_BASE = "https://3001-aquamarine-blackbird-iz2jbcaj.ws-us18.gitpod.io/api/";
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			usuario_creado: false,
			usuario_autenticado: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			/*
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
					}
				}

			*/

			recuperarPassword: email => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				let raw = JSON.stringify({
					service_id: process.env.EMAIL_SERVICE_ID,
					template_id: process.env.EMAIL_TEMPLATE_ID,
					user_id: process.env.EMAIL_USER_ID,
					template_params: {
						from_name: "Nemesis Peluqueria",
						to_name: "Ernesto",
						to_email: email,
						message: "please access this link to recover your password"
					}
				});

				let requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch("https://api.emailjs.com/api/v1.0/email/send", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
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
						}
					})
					.catch(error => console.log("error", error));
			}
		}
	};
};

export default getState;
