import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/checkout.scss";

const Horizontal_card = props => {
	const [cantidad, setCantidad] = useState(1);

	const updateCantidad = e => {
		setCantidad(e.target.value);
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
							<h4 className="card-title">{props.item.nombre}</h4>
							<h5 className="card-text">
								{cantidad} x ${props.item.precio}
							</h5>
						</div>
					</div>
					<div className="col-md-1 d-flex">
						<div className="d-flex justify-content-center align-items-center">
							{/* <select className="form-select" onChange={e => updateCantidad(e)}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
							</select> */}
							<input className="form-control" type="number" min="1" />
						</div>
					</div>
					<div className="col-md-4 d-flex justify-content-end align-items-center mr-5">
						<div className="d-flex">
							<h5 className="card-title">Subtotal:</h5>
							<h5 className="card-text">${parseInt(cantidad) * parseInt(props.item.precio)}</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Horizontal_card.propTypes = {
	item: PropTypes.object,
	id: PropTypes.number
};

export default Horizontal_card;
