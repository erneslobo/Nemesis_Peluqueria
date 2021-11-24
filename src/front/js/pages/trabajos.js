import React, { useContext, useState } from "react";
import { ImagenMuestra } from "../component/imagenMuestra";
import { Context } from "../store/appContext";

export const Trabajos = () => {
	const { store, actions } = useContext(Context);
	const [categoria, setCategoria] = useState("Categorías");

	const arrayCategorias = ["---Todos---", "Favoritos", ...new Set(store.muestras.map(items => items.categoria))];

	// Filtro los resultados según la categoría elegida (esta función se llama en el dropdown)
	const filtrar = categ => {
		setCategoria(categ);
		if (categ == "---Todos---") {
			actions.actualizarMuestrasFiltrados(store.muestras);
		} else if (categ == "Favoritos") {
			actions.actualizarMuestrasFiltrados(store.favoritos);
		} else {
			actions.actualizarMuestrasFiltrados(store.muestras.filter(elem => elem.categoria == categ));
		}
	};

	return (
		<div className="container mt-5">
			<div className="d-flex justify-content-between my-3">
				<div>
					<h2>Nuestros Trabajos</h2>
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

			{/* <h1 className="text-dark muestrasTitulo text-center bg-dark text-white rounded">Cortes de Cabello</h1> */}
			<div className="row flex-row flex-wrap row-cols-1 row-cols-md-3 g-4">
				{store.muestrasFiltrados.map((item, index) => {
					return <ImagenMuestra key={index} item={item} index={index} />;
				})}
			</div>
			<br />
		</div>
	);
};
