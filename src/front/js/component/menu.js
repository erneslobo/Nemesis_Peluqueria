import React from "react";
import { useHistory } from "react-router-dom";

export const Menu = () => {
	const history = useHistory();
	return (
		<div className="row pb-5 menu d-flex">
			<div className="row menuItem" onClick={() => history.push("/productos")}>
				<div className="col">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637880670/Productos_mwgxfv.jpg"
						className="rounded img-fluid float-start menuImg horizontal-card"
						alt="..."
					/>
				</div>
				<div className="col">
					<h2>
						<strong>Productos</strong>
					</h2>
					<hr />
					<h4>Compra aqui los mejores productos para el cuidado de tu cabello y manos.</h4>
					<h4>Trabajamos con productos de L&#39;Oreal, Kerasys, OPI y FABY entre otros.</h4>
				</div>
			</div>
			<div className="row mt-5 menuItem" onClick={() => history.push("/servicios")}>
				<div className="col">
					<h2>
						<strong>Servicios</strong>
					</h2>
					<hr />
					<h4>
						Somos especialisistas en belleza, queratina, color, peinados para fiestas, depilación, pestañas,
						esmaltado en gel, y más!
					</h4>
				</div>
				<div className="col">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637880670/Servicios_cjzwte.jpg"
						className="rounded img-fluid float-end menuImg horizontal-card"
						alt="..."
					/>
				</div>
			</div>
			<div className="row mt-5 menuItem" onClick={() => history.push("/trabajos")}>
				<div className="col">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637880670/Muestras_oqwwsp.jpg"
						className="rounded img-fluid float-start menuImg horizontal-card"
						alt="..."
					/>
				</div>
				<div className="col">
					<h2>
						<strong>Muestras</strong>
					</h2>
					<hr />
					<h3>
						Ingresá aquí y conocé nuestros trabajos, crea tu cuenta y guarda el look que más te guste,
						nosotros te lo hacemos realidad
					</h3>
				</div>
			</div>
		</div>
	);
};
