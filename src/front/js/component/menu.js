import React from "react";

export const Menu = () => {
	return (
		<div className="row mb-5 menu d-flex">
			<div className="row">
				<div className="col">
					<img src="https://www.dummyimage.com/400" className="rounded float-start" alt="..." />
				</div>
				<div className="col">
					<h2>Productos</h2>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col">
					<h2>Servicios</h2>
				</div>
				<div className="col">
					<img src="https://www.dummyimage.com/400" className="rounded float-start" alt="..." />
				</div>
			</div>
			<div className="row mt-5">
				<div className="col">
					<img src="https://www.dummyimage.com/400" className="rounded float-start" alt="..." />
				</div>
				<div className="col">
					<h2>Muestras</h2>
				</div>
			</div>
		</div>
	);
};
