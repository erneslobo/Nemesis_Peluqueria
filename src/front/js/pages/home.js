import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carrusel } from "../component/carrusel";
import { Menu } from "../component/menu";
import "../../styles/home.scss";

export const Home = () => {
	return (
		<div className="container">
			<div className="row containerImagenPrincipal d-flex text-center">
				<img src="https://dummyimage.com/1400x500" className="img-fluid p-0 " alt="..." />
				<div className="textoImagenPrincipal">
					<h5>The largest community of photo enthusiasts</h5>
				</div>
			</div>
			<Carrusel />
			<Menu />
		</div>
	);
};
