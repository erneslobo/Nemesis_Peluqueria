import React, { Component } from "react";
import { Link } from "react-router-dom";

// import facebook_logo from "../../img/facebook_logo.png";
// import instagram_logo from "../../img/instagram_logo.png";
// import whatsapp_logo from "../../img/whatsapp_logo.png";
import whatsappLogo from "../../img/whatsapp.png";
import instagramLogo from "../../img/instagram.png";
import facebookLogo from "../../img/facebook.png";
import nemesis_logo from "../../img/nemesis_completo_blanco.png";
import "../../styles/footer.scss";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="container-fluid">
			<div className="container">
				<div className="row primer-row">
					<div className="col-4 logoPelu">
						<img src={nemesis_logo} alt="" />
					</div>
					<div className="col-4" />
					<div className="col-4" />
				</div>
				<div className="row">
					<div className="col-3">
						<Link to="/contacto" className="link">
							<div className="datos">
								<div className="locacion">
									<i className="fas fa-map-marker-alt" />
								</div>
								<div className="textos">
									<p>Chucarro 1146 esq. Guayaqui</p>
									<p>Martes a Sábados de 10:00 a 20:00 hs</p>
								</div>
							</div>
						</Link>
					</div>
					<div className="col-3" />
					<div className="col-3" />
					<div className="col-3 redes">
						<div className="text">Encuéntranos en: </div>
						<Link
							to={{
								pathname:
									"https://es-la.facebook.com/pages/category/Hair-Salon/N%C3%A9mesis-Peluquer%C3%ADa-110139923033512/"
							}}
							target="_blank">
							<div className="facebook">
								<img src={facebookLogo} alt="" />
							</div>
						</Link>
						<Link to={{ pathname: "https://www.instagram.com/nemesis.peluqueria/?hl=es" }} target="_blank">
							<div className="instagram">
								<img src={instagramLogo} alt="" />
							</div>
						</Link>

						<Link
							to={{
								pathname:
									"https://api.whatsapp.com/send?phone=59892875997&fbclid=IwAR1JfkouJneqduBmPPjcnsvt6kLNuBqW0adMfstVzKTK3UWn0njcMLssV2I"
							}}
							target="_blank">
							<div className="whatsapp">
								<img src={whatsappLogo} alt="" />
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
