import React from "react";
import swal from "sweetalert";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Compra_Exitosa = () => {
	const { store, actions } = useContext(Context);
	const mostrarAlerta = () => {
		actions.borrarItemCarrito();
		swal({
			title: "Su compra ha sido realizada exitosamente",
			icon: "success",
			button: "Aceptar"
		});
	};

	useEffect(() => {
		mostrarAlerta();
	}, []);

	return (
		<>
			<div />;
		</>
	);
};
