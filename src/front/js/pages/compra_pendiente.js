import React from "react";
import swal from "sweetalert";
import { useEffect } from "react";

export const Compra_Pendiente = () => {
	const mostrarAlerta = () => {
		swal({
			title: "Su compra se encuentra pendiente",
			icon: "warning",
			button: "Aceptar"
		}).then(okay => {
			if (okay) {
				history.push("/");
			}
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
