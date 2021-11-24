import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/checkout.scss";
import { Context } from "../store/appContext";

const Horizontal_card = props => {
	const { store, actions } = useContext(Context);
	const [cantidad, setCantidad] = useState(1);

	const updateCantidad = e => {
		e.target.value > 0 ? setCantidad(parseInt(e.target.value)) : null;
		actions.actualizarCantidad(props.item, parseInt(e.target.value));
		props.recalcularTotal();
	};

	useEffect(() => {
		setCantidad(props.item.articulo.quantity);
	}, []);

	return (
		<div>
			<div className="card horizontal-card mb-3 ps-4">
				<div className="row g-0">
					<div className="col-md-2 d-flex m-auto">
						<img src={props.item.imagen} className="img-fluid rounded-start" alt="..." />
					</div>
					<div className="col-md-3">
						<div className="card-body">
							<h4 className="card-title">{props.item.articulo.title}</h4>
							<h5 className="card-text">${props.item.articulo.unit_price}</h5>
						</div>
					</div>
					<div className="col-md-3 d-flex justify-content-center">
						<div className="d-flex text-center py-5 w-50">
							<input
								className="form-control"
								type="number"
								min="1"
								onChange={e => updateCantidad(e)}
								value={cantidad}
							/>
						</div>
					</div>
					<div className="col-md-3 d-flex justify-content-center align-items-center">
						<div className="d-flex">
							<h5 className="card-text">
								${parseInt(cantidad) * parseInt(props.item.articulo.unit_price)}
							</h5>
						</div>
					</div>
					<div className="col-1 d-flex justify-content-end align-items-start">
						<button className="btn btn-eliminar" onClick={() => actions.borrarItemCarrito(props.item)}>
							<i className="fas fa-times" aria-hidden="true" />
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
