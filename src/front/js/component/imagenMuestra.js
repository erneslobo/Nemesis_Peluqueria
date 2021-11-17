import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const ImagenMuestra = ({ item, index }) => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<div className="col">
			<div className="card card-producto imagenMuestra h-100">
				<img src={item.thumbnail} className="card-img-top" alt="..." />
				<div
					className="icono"
					onClick={() => {
						if (Object.keys(store.usuario_actual).length == 0) {
							history.push("/login");
						} else if (store.favoritos.includes(item)) {
							actions.remover_favoritos(item);
						} else {
							actions.agregar_favoritos(item);
						}
					}}>
					<i
						className={`text-danger icono fa-heart fa-lg ${
							store.favoritos.includes(item) ? "fas mostarIcono" : "far ocultarIcono"
						}`}
					/>
				</div>
			</div>
		</div>
	);
};

ImagenMuestra.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number
};
