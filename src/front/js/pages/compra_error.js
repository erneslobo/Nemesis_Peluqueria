import React from "react";
import swal from "sweetalert";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Compra_Error = () => {
	const history = useHistory();
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
