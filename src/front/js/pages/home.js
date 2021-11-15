import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carrusel } from "../component/carrusel";
import { Menu } from "../component/menu";
import "../../styles/home.scss";

export const Home = () => {
	return (
		<div className="container">
			<div className="row containerImagenPrincipal d-flex text-center">
				<img
					src="https://res.cloudinary.com/erneslobo/image/upload/v1636836077/Portada_ohrzr5.jpg"
					className="img-fluid p-0 imagenPrincipal"
					alt="..."
				/>
				<div className="textoImagenPrincipal text-white">
					<h2>The largest community of photo enthusiasts</h2>
				</div>
			</div>
			<Carrusel />
			<Menu />
		</div>
	);
};
