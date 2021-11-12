import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
//import "../../styles/card.scss";

import { Link } from "react-router-dom";

const Card = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="col-lg-3 col-md-4 col-sm-6">
			<div className="card my-2" style={{ width: "18rem" }}>
				<img src={props.item.imagen} className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">{props.item.nombre}</h5>
					<p className="card-text">{props.item.descripcion}</p>
					<h5 className="card-text">${props.item.precio}</h5>
					<div className="d-flex justify-content-between">
						<div>
							<Link to={"/detalle/" + props.id} className="btn btn-outline-primary">
								<span>Detalles</span>
							</Link>
						</div>
						<div>
							<Link to="#" className="btn btn-outline-primary">
								<span>Agregar al carrito</span>
							</Link>
						</div>
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
