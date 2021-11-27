import React from "react";
import { Carrusel2 } from "../component/carrusel2";
import { Menu } from "../component/menu";
import "../../styles/home.scss";

export const Home = () => {
	return (
		<div className="container-fluid home mx-0 px-0">
			<div className="container-fluid">
				<div className="row containerImagenPrincipal d-flex text-center">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1636836077/Portada_ohrzr5.jpg"
						className="img-fluid p-0 imagenPrincipal"
						alt="..."
					/>
					{/* <div className="textoImagenPrincipal text-white">
						<h2>The largest community of photo enthusiasts</h2>
					</div> */}
				</div>
				<div className="container home-wrapper">
					<div className="mb-5 pt-5 px-5">
						<h2 className="text-center pb-4">
							<strong>Conoce nuestro salon</strong>
						</h2>
						<Carrusel2 />
					</div>
					<div className="mt-5 px-5">
						<Menu />
					</div>
				</div>
			</div>
		</div>
	);
};
