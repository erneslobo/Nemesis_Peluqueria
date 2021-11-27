import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const ImagenMuestra = ({ item, index }) => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<>
			<div className="col">
				<div className="card card-producto imagenMuestra h-100">
					<img
						src={item.thumbnail}
						className="card-img-top imgModal"
						alt="..."
						data-bs-toggle="modal"
						data-bs-target={`#modalT${index}`}
					/>
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
			<div
				className="modal fade"
				id={`modalT${index}`}
				tabIndex="3"
				aria-labelledby="exampleModalLabelT"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								<div className="row">
									<div className="col-12 col-sm-12">
										<img src={item.thumbnail} className="card-img-top" alt="..." />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

ImagenMuestra.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number
};
