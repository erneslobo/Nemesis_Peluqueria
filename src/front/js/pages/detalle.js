import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

const Detalle = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="text-center">
			<h1> View de detalles del elemento con ID = {params.theid}</h1>
		</div>
	);
};

export default Detalle;
