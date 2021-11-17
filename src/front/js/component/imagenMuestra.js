import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const ImagenMuestra = ({ item, index }) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="col">
			<div className="card card-producto imagenMuestra h-100">
				<img src={item.thumbnail} className="card-img-top" alt="..." />
				{Object.keys(store.usuario_actual).length > 0 && (
					<div
						className={`btn ${store.favoritos.includes(item) ? "bg-danger icono" : "bg-secondary icono"}`}
						onClick={() => {
							if (store.favoritos.includes(item)) {
								actions.remover_favoritos(item);
							} else {
								actions.agregar_favoritos(item);
							}
						}}>
						<i className="far fa-heart" />
					</div>
				)}
			</div>
		</div>
	);
};

ImagenMuestra.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number
};
