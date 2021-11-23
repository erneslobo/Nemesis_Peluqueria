import React, { useState, useContext, useEffect } from "react";
import Card from "../component/card";
import "../../styles/card.scss";

import { Context } from "../store/appContext";

export const Servicios = () => {
	const { store, actions } = useContext(Context);
	const [categoria, setCategoria] = useState("Categorías");

	// Genero un array con los valores únicos de todas las categorías que encuentre para popular el dropdown
	const arrayCategorias = ["---Todas---", ...new Set(store.productosServicios.map(items => items.categoria))];

	// Filtro los resultados según la categoría elegida (esta función se llama en el dropdown)
	const filtrar = categ => {
		setCategoria(categ);
		if (categ == "---Todas---") {
			// setLista(store.productosServicios);
			actions.actualizarProductosServiciosFiltrados(store.productosServicios);
		} else {
			// setLista(store.productosServicios.filter(elem => elem.categoria == categ));
			store.productosServicios.filter(elem => elem.categoria == categ);
		}
	};

	return (
		<div>
			<div className="container my-3">
				<div className="d-flex justify-content-between my-3">
					<div>
						<h2>Servicios</h2>
					</div>
					<div className="dropdown">
						<button
							className="btn btn-dark px-4 py-1 dropdown-toggle"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							{categoria}
						</button>
						<ul className="dropdown-menu drop-categorias" aria-labelledby="dropdownMenuButton1">
							{arrayCategorias.map((item, index) => {
								return (
									<li className="dropdown-item" key={index} onClick={e => filtrar(item)}>
										{item}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="row">
					{/* {lista.map((item, index) => { */}
					{store.productosServiciosFiltrados.map((item, index) => {
						if (item.tipo == "Servicio") return <Card item={item} key={index} id={index} />;
					})}
				</div>
			</div>
		</div>
	);
};
