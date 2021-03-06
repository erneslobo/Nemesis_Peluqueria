import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/card.scss";

import { Context } from "../store/appContext";

const Card = props => {
	const { store, actions } = useContext(Context);
	const [existeItem, setExisteItem] = useState();

	const existeItemCarrito = item => {
		const nombreEsIgual = elem => elem.articulo.title == item.nombre;
		let indice = store.items_carrito.findIndex(nombreEsIgual);
		console.log(indice);
		indice >= 0 ? setExisteItem(true) : setExisteItem(false);
	};

	useEffect(
		() => {
			existeItemCarrito(props.item);
		},
		[store.items_carrito]
	);

	return (
		<>
			<div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
				<div className="card card-producto my-3" style={{ width: "18rem" }}>
					<img
						id="imgModal"
						src={props.item.imagen}
						className="card-img-top imgModal pt-1"
						alt="..."
						data-bs-toggle="modal"
						data-bs-target={`#modal${props.id}`}
					/>
					<div className="card-body">
						<h5 className="card-title">{props.item.nombre}</h5>
						<p className="card-text descripcion">{props.item.descripcionCorta}</p>
						<h5 className="card-text">${props.item.precio}</h5>
						<div className="d-flex justify-content-between">
							<div>
								<button
									id="imgModal"
									type="button"
									className="btn btn-dark"
									data-bs-toggle="modal"
									data-bs-target={`#modal${props.id}`}>
									Detalles
								</button>
							</div>
							{props.item.tipo == "Producto" ? (
								<div>
									{!existeItem ? (
										<span
											className="btn btn-dark btn-agregar"
											onClick={() => {
												actions.agregarCarrito(props.item);
												existeItemCarrito(props.item);
											}}>
											Agregar al carrito
										</span>
									) : (
										<span className="btn btn-secondary btn-agregar" disabled>
											Agregado!
										</span>
									)}
								</div>
							) : // 	)}
							// </>
							null}
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id={`modal${props.id}`}
				tabIndex="3"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-header espacio-btn-close">
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								<div className="row">
									<div className="col-7 col-sm-7">
										<img src={props.item.imagen} className="card-img-top" alt="..." />
									</div>
									<div className="col-md-auto ms-auto" />
									<div className="col-4 col-sm-4">
										<h5 className="card-title ml-1">{props.item.nombre}</h5>
										<p className="card-text descripcion">{props.item.descripcion}</p>
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

Card.propTypes = {
	item: PropTypes.object,
	id: PropTypes.number
};

export default Card;
