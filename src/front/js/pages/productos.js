import React, { useState, useContext, useEffect } from "react";
import Card from "../component/card";

import { Context } from "../store/appContext";

export const Productos = () => {
	const { store, actions } = useContext(Context);

	//let clonLista = store.productosServicios;

	const [lista, setLista] = useState([]);

	const arrayCategorias = ["Todo", ...new Set(store.productosServicios.map(items => items.categoria))];

	//const arrayFiltro = store.productosServicios.filter(item => item.categoria == "Manicuría");
	//console.log(arrayFiltro);

	const filtrar = item => {
		if (item == "Todo") {
			setLista(store.productosServicios);
		} else {
			setLista(store.productosServicios.filter(elem => elem.categoria == item));
		}
	};

	useEffect(() => {
		filtrar("Todo");
	}, []);

	return (
		<div>
			<div className="dropdown ">
				<button
					className="btn boton px-4 py-1 dropdown-toggle"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false">
					Categorías
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					{arrayCategorias.map((item, index) => {
						return (
							<li className="dropdown-item" key={index} onClick={e => filtrar(item)}>
								{item}
							</li>
						);
					})}
				</ul>
			</div>

			<div className="container">
				<h2>Productos</h2>
				<div className="row">
					{lista.map((item, index) => {
						if (item.tipo == "Producto") return <Card item={item} key={index} id={index} />;
					})}
				</div>
			</div>
		</div>
	);
};
