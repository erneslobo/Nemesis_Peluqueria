import React, { Component } from "react";
import facebook_logo from "../../img/facebook_logo.png";
import instagram_logo from "../../img/instagram_logo.png";
import whatsapp_logo from "../../img/whatsapp_logo.png";
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
					<div className="col-3 datos">
						<p>Chucarro 1146 esq. Guayaqui</p>
						<p>Martes a Sábados de 10:00 a 20:00 hs</p>
					</div>
					<div className="col-3" />
					<div className="col-3" />
					<div className="col-3 redes">
						<div className="text">Encuéntranos en: </div>
						<div className="facebook">
							<img src={facebook_logo} alt="" />
						</div>
						<div className="instagram">
							<img src={instagram_logo} alt="" />
						</div>
						<div className="whatsapp">
							<img src={whatsapp_logo} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
