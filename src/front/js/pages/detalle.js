import React from "react";
import { useParams } from "react-router-dom";

const Detalle = () => {
	const params = useParams();

	return (
		<div className="text-center">
			<h1> View de detalles del elemento con ID = {params.theid}</h1>
		</div>
	);
};

export default Detalle;
