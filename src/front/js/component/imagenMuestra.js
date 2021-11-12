import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";

export const ImagenMuestra = ({ item, index }) => {
	const { store, actions } = useContext(Context);
	return (
		<div className="col">
			<div className="card">
				<img src={item.thumbnail} className="card-img-top" alt="..." />
			</div>
		</div>
	);
};

ImagenMuestra.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number
};
