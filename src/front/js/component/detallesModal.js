import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/card.scss";

export const DetallesModal = () => {
	
    return (
		<div className="col-lg-3 col-md-4 col-sm-6">
			<div className="card card-producto my-2" style={{ width: "18rem" }}>
				<img src="" className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">Nombre</h5>
					<p className="card-text descripcion">Descripción</p>
					<h5 className="card-text">Precio</h5>
                </div>
			</div>
		</div>
	);
};
