import React, { useState } from "react";
import "../../styles/checkout.scss";

export const Checkout = () => {
	const [mapa_visible, setMapa_visible] = useState(false);

	return (
		<>
			<h2 className="text-center pt-4">Mi Carrito</h2>
			<div className="container pt-2">
				<p className="lead pl-3 font-weight-bold">Artículos a Comprar</p>
				<div className="row py-1">
					<div className="col">Nombre</div>
					<div className="col">Precio</div>
					<div className="col">Cantidad</div>
					<div className="col">Subtotal</div>
				</div>
				<div className="row">
					<div className="col">Ejemplo 1</div>
					<div className="col">$ 500</div>
					<div className="col"> 2 </div>
					<div className="col">$ 1000</div>
				</div>
				<div className="row">
					<div className="col">
						<b>Total del carrito</b>
					</div>
					<div className="col" />
					<div className="col"> </div>
					<div className="col">
						<b>$ 1000</b>
					</div>
				</div>
				<p className="lead pl-3 font-weight-bold">Opciones de Pago</p>
				<div id="imput" className="pl-2">
					<div className="form-check">
						<input
							className="form-check-input"
							type="radio"
							name="pago"
							id="PagoEfectivo"
							value="option1"
							checked
						/>
						<label className="form-check-label">Efectivo</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="radio" name="pago" id="MercadoPago" value="option2" />
						<label className="form-check-label pb-2">Tarjeta</label>
					</div>
				</div>
				<p>* El producto se entrega únicamente en el local</p>

				<button
					id="boton_mapa"
					type="submit"
					className="btn btn-dark"
					onClick={e => {
						setMapa_visible(!mapa_visible);
					}}>
					{mapa_visible ? "Ocultar mapa" : "Mostrar mapa"}
				</button>

				{mapa_visible ? (
					<div className="row mt-2">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.788254382282!2d-56.15046068476206!3d-34.91176298038085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f810d52d2ad53%3A0xe8c7c84ba163d1b4!2sAlejandro%20Chucarro%201102%2C%2011300%20Montevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1sen!2scr!4v1636215513118!5m2!1sen!2scr"
							width="600"
							height="450"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
						/>
					</div>
				) : null}

				<div className="col-auto pt-3">
					<button type="submit" className="btn btn-dark mb-3">
						Comprar!
					</button>
				</div>
			</div>
		</>
	);
};
