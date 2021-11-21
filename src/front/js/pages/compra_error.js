import React from "react";
import swal from "sweetalert";
import { useEffect } from "react";

export const Compra_Error = () => {
	const mostrarAlerta = () => {
		swal({
			title: "Hubo un error con su compra",
			icon: "error",
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
