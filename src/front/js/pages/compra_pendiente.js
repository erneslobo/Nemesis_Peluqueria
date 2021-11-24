import React from "react";
import swal from "sweetalert";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Compra_Pendiente = () => {
	const history = useHistory();
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
