import React from "react";
import "../../styles/contacto.scss";
import whatsappLogo from "../../img/whatsapp.png";
import instagramLogo from "../../img/instagram.png";
import facebookLogo from "../../img/facebook.png";
import telefonoLogo from "../../img/telefono.png";

export const Contacto = () => {
	return (
		<div className="container home-wrapper mt-0">
			<div className="container-fluid mb-0 pt-3">
				<div className="text-center row mt-3">
					<h2>Contacto</h2>
				</div>
				<div className="row py-2 mt-2">
					<div className="row">
						<div className="col d-flex justify-content-center">
							<a
								href="https://www.instagram.com/nemesis.peluqueria/"
								className="linkContacto d-flex align-items-center ms-2"
								target="_blank"
								rel="noopener noreferrer">
								<div className="flex-shrink-0">
									<img src={instagramLogo} alt="" />
								</div>
								<div className="flex-grow-1 ms-3">
									{" "}
									<h5>@nemesis.peluqueria</h5>{" "}
								</div>
							</a>
						</div>
						<div className="col d-flex justify-content-center">
							<a
								href="https://api.whatsapp.com/send?phone=59892875997&fbclid=IwAR1JfkouJneqduBmPPjcnsvt6kLNuBqW0adMfstVzKTK3UWn0njcMLssV2I"
								className="linkContacto d-flex align-items-center"
								target="_blank"
								rel="noopener noreferrer">
								<div className="flex-shrink-0">
									<img src={whatsappLogo} alt="" />
								</div>
								<div className="flex-grow-1 ms-3">
									<h5>2707 6442</h5>
								</div>
							</a>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col d-flex justify-content-center">
							<a
								href="https://www.facebook.com/N%C3%A9mesis-Peluquer%C3%ADa-110139923033512/"
								className="linkContacto d-flex align-items-center"
								target="_blank"
								rel="noopener noreferrer">
								<div className="flex-shrink-0">
									<img src={facebookLogo} alt="" />
								</div>
								<div className="flex-grow-1 ms-3">
									{" "}
									<h5>Némesis Peluquería</h5>
								</div>
							</a>
						</div>
						<div className="col d-flex justify-content-center">
							<div className="linkContacto">
								<div className="flex-shrink-0 d-flex align-items-center">
									<img src={telefonoLogo} alt="" />
									<div className="flex-grow-1 ms-3">
										<h5>2707 6442</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-2 pb-3">
					<div>
						<h5>
							<strong>Encuentranos en:</strong> Chucarro 1146 esq. Guayaqui
						</h5>
					</div>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.788254382282!2d-56.15046068476206!3d-34.91176298038085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f810d52d2ad53%3A0xe8c7c84ba163d1b4!2sAlejandro%20Chucarro%201102%2C%2011300%20Montevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1sen!2scr!4v1636215513118!5m2!1sen!2scr"
						width="600"
						height="450"
						style={{ border: 0 }}
						allowFullScreen=""
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	);
};
