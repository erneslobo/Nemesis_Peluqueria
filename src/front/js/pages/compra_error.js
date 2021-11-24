import React from "react";
import swal from "sweetalert";
import { useEffect } from "react";

export const Compra_Error = () => {
	const mostrarAlerta = () => {
		swal({
			title: "Hubo un error con su compra",
			icon: "error",
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
