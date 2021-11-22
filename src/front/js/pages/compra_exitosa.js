import React from "react";
import swal from "sweetalert";
import { useEffect } from "react";

export const Compra_Exitosa = () => {
	const mostrarAlerta = () => {
		swal({
			title: "Su compra ha sido realizada exitosamente",
			icon: "success",
			button: "Aceptar"
		});
	};

	useEffect(() => {
		mostrarAlerta();
	});

	return (
		<>
			<div />;
		</>
	);
};
