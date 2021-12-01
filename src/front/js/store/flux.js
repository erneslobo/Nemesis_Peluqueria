const getState = ({ getStore, getActions, setStore }) => {
	const URL_BASE = process.env.URL_BASE;
	const WEB_URL_BASE = process.env.WEB_URL_BASE;
	const MERCADO_PAGO_PUBLIC_KEY = process.env.MERCADO_PAGO_PUBLIC_KEY;

	console.log(URL_BASE);

	const mercadopago = new MercadoPago(MERCADO_PAGO_PUBLIC_KEY, {
		locale: "es-AR" // The most common are: 'pt-BR', 'es-AR' and 'en-US'
	});

	return {
		store: {
			message: null,
			usuario_creado: false,
			usuario_creado_alerta: false,
			usuario_autenticado: false,
			email_password_invalido_alerta: false,
			correo_password_enviado: false,
			correo_enviado_error_alerta: false,
			password_actualizado: false,
			password_no_iguales_alerta: false,
			usuario_existe_alerta: false,
			token_invalido_alerta: false,
			muestras: [],
			muestrasFiltrados: [],
			favoritos: [],
			mostrarFavoritos: false,

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
			// *********************** Ocultar alertas para ocultar alerta ***********************
			ocultar_alertas: () => {
				setStore({ email_password_invalido_alerta: false });
				setStore({ correo_enviado_error_alerta: false });
				setStore({ password_no_iguales_alerta: false });
				setStore({ usuario_existe_alerta: false });
				setStore({ token_invalido_alerta: false });
				setStore({ usuario_creado_alerta: false });
			},

			// *********************** mostrar alerta passwords no coinciden **********************
			mostrar_password_no_iguales_alerta: () => setStore({ password_no_iguales_alerta: true }),

			// *********************** cambiar usuario_creado a false **********************
			cambiar_usuario_creado_false: () => setStore({ usuario_creado: false }),

			// *********************** cambiar password_actualizado a false **********************
			cambiar_password_actualizado_false: () => setStore({ password_actualizado: false }),

			// *********************** cambiar correo_password_enviado a false **********************
			cambiar_correo_password_enviado_false: () => setStore({ correo_password_enviado: false }),
			// *********************** cambiar mostrarFavoritos a true **********************
			mostrarFavoritos: estado => {
				setStore({ mostrarFavoritos: estado });
			},

			// *********************** Actualizar filtro de muestras ***********************
			actualizarMuestrasFiltrados: items => {
				setStore({ muestrasFiltrados: items });
			},

			// *********************** Actualizar filtro de Productos y Servicios ***********************

			actualizarProductosServiciosFiltrados: items => {
				setStore({ productosServiciosFiltrados: items });
			},

			// *********************** Traer favoritos de la base de datos ***********************
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

			// *********************** Agregar favoritos de la base de datos ***********************

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

			// *********************** Remover favoritos de la base de datos ***********************

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

			// *********************** Traer lista de muestras de trabajo de la base de datos ***********************

			obtener_muestras: () => {
				if (localStorage.getItem("muestras") == null) {
					let requestOptions = {
						method: "GET",
						redirect: "follow"
					};
					fetch(`${URL_BASE}muestras`, requestOptions)
						.then(response => response.json())
						.then(result => {
							setStore({ muestras: result });
							setStore({ muestrasFiltrados: result });
							// localStorage.setItem("muestras", JSON.stringify(result));
						})
						.catch(error => console.log("error", error));
				} else {
					setStore({ muestras: JSON.parse(localStorage.getItem("muestras")) });
				}
			},

			// *********************** Cambiar la contraseña ***********************

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
					.then(response => {
						if (response.status !== 200) {
							setStore({ token_invalido_alerta: true });
							throw new Error(response.status);
						}
						return response.json();
					})
					.then(result => {
						setStore({ token_invalido_alerta: false });
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
						raw = JSON.stringify({
							service_id: process.env.EMAIL_SERVICE_ID,
							template_id: process.env.EMAIL_TEMPLATE_ID,
							user_id: process.env.EMAIL_USER_ID,
							template_params: {
								from_name: "Némesis Peluquería",
								to_name: result.user.nombre,
								to_email: email,
								message:
									"Para cambiar el password, ingrese al siguiente enlace, por favor ingrese el nuevo password y el token que se le provee en este email",
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
					.then(response => {
						if (response.status !== 200) {
							setStore({ correo_enviado_error_alerta: true });
							throw new Error(response.status);
						}
						return response.text();
					})
					.then(result => {
						setStore({ correo_enviado_error_alerta: false });
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
				// usuario_existe_alerta
				fetch(`${URL_BASE}registro`, requestOptions)
					.then(response => {
						if (response.status == 409) {
							setStore({ usuario_existe_alerta: true });
							throw new Error(response.status);
						}
						return response.json();
					})
					.then(result => {
						setStore({ usuario_creado_alerta: true });
						setStore({ usuario_existe_alerta: false });
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
					.then(response => {
						if (response.status == 401) {
							setStore({ email_password_invalido_alerta: true });
							throw new Error(response.status);
						}
						return response.json();
					})
					.then(result => {
						if (result.access_token) {
							localStorage.setItem("Token", result.access_token);
							getStore().ocultar_alertas;
							setStore({ email_password_invalido_alerta: false });
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
						//Ordeno alfabéticamente según el nombre
						console.log(result);
						let arrayOrdenado = result.sort((a, b) => a.nombre.localeCompare(b.nombre));
						setStore({ productosServicios: arrayOrdenado });
						setStore({ productosServiciosFiltrados: arrayOrdenado });
					})
					.catch(error => console.log("error", error));
			},

			// *********************** CERRAR SESIÓN ***********************
			cerrarSesion: () => {
				localStorage.removeItem("Token");
				localStorage.setItem("items_carrito", JSON.stringify([]));
				setStore({ usuario_autenticado: false });
				setStore({ usuario_actual: {} });
				setStore({ items_carrito: [] });
				setStore({ favoritos: [] });
				getActions().ocultar_alertas;
			},

			// *********************** AGREGAR AL CARRITO ***********************
			agregarCarrito: item => {
				const store = getStore();
				let itemsCarrito = [
					...store.items_carrito,
					{
						imagen: item.imagen,

						articulo: {
							title: item.nombre,
							quantity: 1,
							unit_price: item.precio
						}
					}
				];
				setStore({ items_carrito: itemsCarrito });
				localStorage.setItem("items_carrito", JSON.stringify(itemsCarrito));
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
				localStorage.setItem("items_carrito", JSON.stringify(articuloACambiar));
			},

			// *********************** BORRAR ITEM DE CARRITO ***********************
			borrarItemCarrito: item => {
				const todosMenosItem = elem => elem != item;

				let newCarrito = getStore().items_carrito.filter(todosMenosItem);

				setStore({ items_carrito: newCarrito });
				localStorage.setItem("items_carrito", JSON.stringify(newCarrito));
			},

			// *********************** BORRAR CARRITO COMPLETO***********************
			limpiarCarrito: () => {
				setStore({ items_carrito: [] });
				localStorage.setItem("items_carrito", JSON.stringify([]));
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
			},

			// *********************** VALIDAR TOKEN SI EXISTE EN LOCAL STORAGE PARA MANTENER SESION ABIERTA ***********************

			mantenerSesion: () => {
				if (localStorage.getItem("Token") != null) {
					let myHeaders = new Headers();
					myHeaders.append("Authorization", `Bearer ${localStorage.getItem("Token")}`);

					let requestOptions = {
						method: "GET",
						headers: myHeaders,
						redirect: "follow"
					};

					fetch(`${URL_BASE}validarToken`, requestOptions)
						.then(response => {
							if (response.status !== 200) {
								if (localStorage.getItem("items_carrito") != null) {
									localStorage.setItem("items_carrito", JSON.stringify([]));
								}
								throw new Error(response.status);
							}
							return response.json();
						})
						.then(result => {
							if (localStorage.getItem("items_carrito") == null) {
								localStorage.setItem("items_carrito", JSON.stringify([]));
							} else {
								setStore({ items_carrito: JSON.parse(localStorage.getItem("items_carrito")) });
							}
							setStore({ usuario_autenticado: true });
							setStore({ usuario_actual: result.usuario });
						})
						.catch(error => console.log("error", error));
				}
			}
		}
	};
};

export default getState;
