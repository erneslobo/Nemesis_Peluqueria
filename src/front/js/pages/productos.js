import React, { useContext } from "react";
import Card from "../component/card";
import { Context } from "../store/appContext";

export const Productos = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div className="container">
				<h2>Productos y Servicios</h2>
				<div className="row">
					{store.productosServicios.map((item, index) => {
						return <Card item={item} key={index} id={index} />;
					})}
				</div>
			</div>
		</div>
	);
};
