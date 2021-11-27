import React from "react";
import swal from "sweetalert";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Compra_Exitosa = () => {
	const { actions } = useContext(Context);
	const history = useHistory();
	const mostrarAlerta = () => {
		actions.limpiarCarrito();
		swal({
			title: "Su compra ha sido realizada exitosamente",
			icon: "success",
			button: "Aceptar"
		}).then(okay => {
			if (okay) {
				history.push("/");
			}
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
