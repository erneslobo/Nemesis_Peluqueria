import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Alerta = ({ alerta, mensaje }) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="position-absolute top-0 start-50 translate-middle-x p-3" style={{ zIndex: 11 }}>
			<div
				className={`toast align-items-center text-white bg-danger bg-gradient border-0 ${
					alerta ? "show" : "hide"
				}`}
				role="alert"
				aria-live="assertive"
				aria-atomic="true">
				<div className="d-flex">
					<div className="toast-body text-center">{mensaje}</div>
					<button
						type="button"
						className="btn-close btn-close-white me-2 m-auto"
						aria-label="Close"
						onClick={() => actions.ocultar_alertas()}
					/>
				</div>
			</div>
		</div>
	);
};

Alerta.propTypes = {
	mensaje: PropTypes.string,
	alerta: PropTypes.bool
};
