import React, { useContext } from "react";
import { ImagenMuestra } from "../component/imagenMuestra";
import { Context } from "../store/appContext";

export const Trabajos = () => {
	const { store } = useContext(Context);
	return (
		<div className="container mt-5">
			<h1 className="text-dark">Cortes de Cabello</h1>
			<div className="row flex-row flex-wrap row-cols-1 row-cols-md-3 g-4">
				{store.muestras.map((item, index) => {
					if (item.categoria == "Cabello") {
						return <ImagenMuestra key={index} item={item} index={index} />;
					}
				})}
			</div>
			<br />
			<h1 className="text-dark">Uñas</h1>
			<div className="row flex-row flex-wrap row-cols-1 row-cols-md-3 g-4">
				{store.muestras.map((item, index) => {
					if (item.categoria == "Uñas") {
						return <ImagenMuestra key={index} item={item} index={index} />;
					}
				})}
			</div>
			<br />
			<h1 className="text-dark">Pestañas</h1>
			<div className="row flex-row flex-wrap row-cols-1 row-cols-md-3 g-4">
				{store.muestras.map((item, index) => {
					if (item.categoria == "Pestañas") {
						return <ImagenMuestra key={index} item={item} index={index} />;
					}
				})}
			</div>
			<br />
		</div>
	);
};
