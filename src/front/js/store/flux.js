const getState = ({ getStore, getActions, setStore }) => {
	const URL_BASE = process.env.URL_BASE;
	const WEB_URL_BASE = process.env.WEB_URL_BASE;
	const MERCADO_PAGO_PUBLIC_KEY = process.env.MERCADO_PAGO_PUBLIC_KEY;

	const mercadopago = new MercadoPago(MERCADO_PAGO_PUBLIC_KEY, {
		locale: "es-AR" // The most common are: 'pt-BR', 'es-AR' and 'en-US'
	});

	return {
		store: {
			message: null,
			usuario_creado: false,
			usuario_autenticado: false,
			correo_password_enviado: false,
			password_actualizado: false,
			muestras: [],
			muestrasFiltrados: [],
			favoritos: [],

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

			/* 
			items_carrito es un array de objetos, con los items en el carrito, con la siguiente forma:
			items_carrito: [
								{
									"title": "My Item",
									"quantity": 1,
									"unit_price": 75.76
								}
							]
			*/
			items_carrito: [],

			productosServicios: [],
			productosServiciosFiltrados: []
		},
		actions: {
			actualizarMuestrasFiltrados: items => {
				setStore({ muestrasFiltrados: items });
			},
			actualizarProductosServiciosFiltrados: items => {
				setStore({ productosServiciosFiltrados: items });
			},

			obtener_favoritos: () => {
				const store = getStore();
				let myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${localStorage.getItem("Token")}`);

				let requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow"
				};

				fetch(`${URL_BASE}favoritos`, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log(result);
						for (let i in result) {
							setStore({
								favoritos: [
									...store.favoritos,
									...store.muestras.filter(item => item["id"] == result[i]["muestra_id"])
								]
							});
						}
					})
					.catch(error => console.log("error", error));
			},

			agregar_favoritos: muestra => {
				const store = getStore();
				let myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${localStorage.getItem("Token")}`);

				let requestOptions = {
					method: "POST",
					headers: myHeaders,
					redirect: "follow"
				};

				fetch(`${URL_BASE}favoritos/${muestra["id"]}`, requestOptions)
					.then(response => response.json())
					.then(result => setStore({ favoritos: [...store.favoritos, muestra] }))
					.catch(error => console.log("error", error));
			},

			remover_favoritos: muestra => {
				const store = getStore();
				let myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${localStorage.getItem("Token")}`);

				let requestOptions = {
					method: "DELETE",
					headers: myHeaders,
					redirect: "follow"
				};

				fetch(`${URL_BASE}favoritos/${muestra["id"]}`, requestOptions)
					.then(response => response.json())
					.then(result => {
						const filtrarFavoritos = store.favoritos.filter(item => item != muestra);
						setStore({ favoritos: filtrarFavoritos });
					})
					.catch(error => console.log("error", error));
			},

			obtener_muestras: () => {
				if (localStorage.getItem("muestras") == null) {
					console.log("muestrasS");
					let requestOptions = {
						method: "GET",
						redirect: "follow"
					};
					fetch(`${URL_BASE}muestras`, requestOptions)
						.then(response => response.json())
						.then(result => {
							console.log(result);
							setStore({ muestras: result });
							setStore({ muestrasFiltrados: result });
							// localStorage.setItem("muestras", JSON.stringify(result));
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
						console.log(result.access_token);

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

						console.log(process.env.EMAIL_USER_ID);

						requestOptions = {
							method: "POST",
							headers: myHeaders,
							body: raw,
							redirect: "follow"
						};

						return fetch("https://api.emailjs.com/api/v1.0/email/send", requestOptions);
					})
					.then(response => response.text())
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
			},

			// *********************** TRAER PRODUCTOS Y SERVICIOS ***********************
			getProductosYServicios: () => {
				fetch(`${URL_BASE}productos`)
					.then(res => res.json())
					.then(result => {
						setStore({ productosServicios: result });
						setStore({ productosServiciosFiltrados: result });
						console.log(productosServicios);
					})
					.catch(error => console.log("error", error));
			},

			// *********************** CERRAR SESIÓN ***********************
			cerrarSesion: () => {
				localStorage.removeItem("Token");
				setStore({ usuario_autenticado: false });
				setStore({ usuario_actual: {} });
			},

			// *********************** AGREGAR AL CARRITO ***********************
			agregarCarrito: item => {
				const store = getStore();
				setStore({
					items_carrito: [
						...store.items_carrito,
						{
							imagen: item.imagen,

							articulo: {
								title: item.nombre,
								quantity: 1,
								unit_price: item.precio
							}
						}
					]
				});
			},

			// *********************** ACTUALIZAR CANTIDAD ***********************
			actualizarCantidad: (item, cantidad) => {
				//Función de condición para el findIndex
				const encontrarArticulo = elem => elem == item;

				let articuloACambiar = [...getStore().items_carrito];

				//Busco el index del item que cumple la condicion de 'encontrarArticulo'
				let indice = articuloACambiar.findIndex(encontrarArticulo);

				//Actualizo cantidad
				articuloACambiar[indice]["articulo"]["quantity"] = cantidad;
				setStore({ items_carrito: articuloACambiar });
			},

			// *********************** BORRAR ITEM DE CARRITO ***********************
			borrarItemCarrito: item => {
				const todosMenosItem = elem => elem != item;

				let newCarrito = getStore().items_carrito.filter(todosMenosItem);

				setStore({ items_carrito: newCarrito });
			},
			// *********************** INTEGRACION MERCADO PAGO ***********************
			pagarMercadoPago: carrito => {
				let myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${localStorage.getItem("Token")}`);
				myHeaders.append("Content-Type", "application/json");
				let raw = JSON.stringify(carrito);

				let requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(`${URL_BASE}mercado_pago_prefencias`, requestOptions)
					.then(response => response.json())
					.then(preference => {
						console.log(preference);
						// Para renderizar el botón de checkout
						mercadopago.checkout({
							preference: {
								id: preference["id"]
							},
							render: {
								container: "#button-checkout", // Class name where the payment button will be displayed
								label: "Pagar" // Change the payment button text (optional)
							}
						});
					})
					.catch(error => console.log("error", error));
			}
		}
	};
};

export default getState;
