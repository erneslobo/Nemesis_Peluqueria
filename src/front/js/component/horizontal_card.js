import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/checkout.scss";
import { Context } from "../store/appContext";

const Horizontal_card = props => {
	const { store, actions } = useContext(Context);
	const [cantidad, setCantidad] = useState(1);

	const updateCantidad = e => {
		e.target.value > 0 ? setCantidad(e.target.value) : null;
		actions.actualizarCantidad(props.item, e.target.value);
		props.recalcularTotal();
	};

	return (
		<div>
			<div className="card horizontal-card mb-3">
				<div className="row g-0">
					<div className="col-md-2">
						<img src={props.item.imagen} className="img-fluid rounded-start" alt="..." />
					</div>
					<div className="col-md-3">
						<div className="card-body">
							<h4 className="card-title">{props.item.articulo.title}</h4>
							<h5 className="card-text">
								{cantidad} x ${props.item.articulo.unit_price}
							</h5>
						</div>
					</div>
					<div className="col-md-1 d-flex">
						<div className="d-flex py-5">
							<input
								className="form-control"
								type="number"
								min="1"
								value={cantidad}
								onChange={e => updateCantidad(e)}
							/>
						</div>
					</div>
					<div className="col-md-4 d-flex justify-content-end align-items-center mr-2">
						<div className="d-flex">
							<h5 className="card-title">Subtotal:</h5>
							<h5 className="card-text">
								${parseInt(cantidad) * parseInt(props.item.articulo.unit_price)}
							</h5>
						</div>
					</div>
					<div className="col-2 d-flex justify-content-center align-items-center">
						<button
							className="btn btn-outline-dark btn-eliminar"
							onClick={() => actions.borrarItemCarrito(props.item)}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

Horizontal_card.propTypes = {
	item: PropTypes.object,
	id: PropTypes.number,
	recalcularTotal: PropTypes.func
};

export default Horizontal_card;
