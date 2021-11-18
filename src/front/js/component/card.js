import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/card.scss";

import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = props => {
	const { store, actions } = useContext(Context);
	// const [existeItem, setExisteItem] = useState(false);
	// const [cantidad, setCantidad] = useState(1);

	// const existeItemCarrito = item => {
	// 	const encontrarArticulo = elem => elem == item;
	// 	let indice = store.items_carrito.findIndex(encontrarArticulo);
	// 	indice >= 0 ? setExisteItem(true) : setExisteItem(false);
	// };

	// const updateCantidad = e => {
	// 	console.log(props.item);
	// 	console.log(e.target.value);
	// 	// e.target.value > 0 ? setCantidad(e.target.value) : null;
	// 	// actions.actualizarCantidad(props.item, e.target.value);
	// };

	// useEffect(() => {
	// 	existeItemCarrito(props.item);
	// }, []);

	return (
		<div className="col-lg-3 col-md-4 col-sm-6">
			<div className="card card-producto my-2" style={{ width: "18rem" }}>
				<img src={props.item.imagen} className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">{props.item.nombre}</h5>
					<p className="card-text descripcion">{props.item.descripcion}</p>
					<h5 className="card-text">${props.item.precio}</h5>
					<div className="d-flex justify-content-between">
						<div>
							<Link to={"/detalle/" + props.id} className="btn btn-dark">
								<span>Detalles</span>
							</Link>
						</div>
						{props.item.tipo == "Producto" ? (
							// <>
							// 	{existeItem ? (
							// 		<div className="d-flex">
							// 			<input
							// 				className="form-control"
							// 				type="number"
							// 				min="1"
							// 				value={cantidad}
							// 				onChange={e => updateCantidad(e)}
							// 			/>
							// 		</div>
							// 	) : (
							<div>
								<Link to="#" className="btn btn-dark">
									<span
										onClick={() => {
											actions.agregarCarrito(props.item);
											// setExisteItem(true);
										}}>
										Agregar al carrito
									</span>
								</Link>
							</div>
						) : // 	)}
						// </>
						null}
					</div>
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	item: PropTypes.object,
	id: PropTypes.number
};

export default Card;
