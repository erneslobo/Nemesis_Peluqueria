import React, { Component } from "react";
import facebook_logo from "../../img/facebook_logo.png";
import instagram_logo from "../../img/instagram_logo.png";
import whatsapp_logo from "../../img/whatsapp_logo.png";
import "../../styles/footer.scss";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="container-fluid">
			<div className="container">
				<div className="row">
					<div className="col-3"> Logo</div>
					<div className="col-3">nada</div>
					<div className="col-3">nada</div>
					<div className="col-3">nada</div>
				</div>
				<div className="row">
					<div className="col-3"> texto</div>
					<div className="col-3">nada</div>
					<div className="col-3">nada</div>
					<div className="col-3 redes">
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
