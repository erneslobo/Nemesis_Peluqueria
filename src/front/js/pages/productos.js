import React, { useState, useContext, useEffect } from "react";
import Card from "../component/card";
import "../../styles/card.scss";

import { Context } from "../store/appContext";

export const Productos = () => {
	const { store, actions } = useContext(Context);

	// Genero un array con los valores únicos de todas las categorías que encuentre para popular el dropdown
	const arrayCategorias = ["---Todas---", ...new Set(store.productosServicios.map(items => items.categoria))];

	// Filtro los resultados según la categoría elegida (esta función se llama en el dropdown)
	const filtrar = categ => {
		if (categ == "---Todas---") {
			actions.actualizarProductosServiciosFiltrados(store.productosServicios);
		} else {
			actions.actualizarProductosServiciosFiltrados(
				store.productosServicios.filter(elem => elem.categoria == categ)
			);
		}
	};

	return (
		<div>
			<div className="container my-3">
				<div className="d-flex justify-content-between my-3">
					<div>
						<h2>Productos</h2>
					</div>
					<div className="dropdown">
						<button
							className="btn btn-dark px-4 py-1 dropdown-toggle"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							Categorías
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
					{store.productosServiciosFiltrados.map((item, index) => {
						if (item.tipo == "Producto") return <Card item={item} key={index} id={index} />;
					})}
				</div>
			</div>
		</div>
	);
};

/* MODAL */
/* <!-- Vertically centered modal -->
<div class="modal-dialog modal-dialog-centered">
  ...
</div>

<!-- Vertically centered scrollable modal -->
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
  ...
</div>*/
