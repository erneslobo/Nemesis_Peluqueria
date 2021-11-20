import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import Detalle from "./pages/detalle";
import { Admin } from "./pages/admin";
import { Checkout } from "./pages/checkout";
import { Contacto } from "./pages/contacto";
import { Login } from "./pages/login";
import { Productos } from "./pages/productos";
import { Registro } from "./pages/registro";
import { Servicios } from "./pages/servicios";
import { Trabajos } from "./pages/trabajos";
import { Recuperar_Password } from "./pages/recuperar_password";
import { Reset_Password } from "./pages/password_reset";
import { Compra_Exitosa } from "./pages/compra_exitosa";
import { Compra_Pendiente } from "./pages/compra_pendiente";
import { Compra_Error } from "./pages/compra_error";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/detalle/:theid">
							<Detalle />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/registro">
							<Registro />
						</Route>
						<Route exact path="/reset_password">
							<Reset_Password />
						</Route>
						<Route exact path="/recuperar_password">
							<Recuperar_Password />
						</Route>
						<Route exact path="/checkout">
							<Checkout />
						</Route>
						<Route exact path="/admin">
							<Admin />
						</Route>
						<Route exact path="/contacto">
							<Contacto />
						</Route>
						<Route exact path="/productos">
							<Productos />
						</Route>
						<Route exact path="/servicios">
							<Servicios />
						</Route>
						<Route exact path="/trabajos">
							<Trabajos />
						</Route>
						<Route exact path="/compra-exitosa">
							<Compra_Exitosa />
						</Route>
						<Route exact path="/compra-pendiente">
							<Compra_Pendiente />
						</Route>
						<Route exact path="/compra-error">
							<Compra_Error />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
