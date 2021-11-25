import React from "react";

export const Menu = () => {
	return (
		<div className="row pb-5 menu d-flex">
			<div className="row">
				<div className="col">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637880670/Productos_mwgxfv.jpg"
						className="rounded float-start menuImg"
						alt="..."
					/>
				</div>
				<div className="col">
					<h2>Productos</h2>
					<hr />
					<h3>Test</h3>
					<h3>test</h3>
					<h3>test</h3>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col">
					<h2>Servicios</h2>
					<hr />
					<h3>Test</h3>
					<h3>test</h3>
					<h3>test</h3>
				</div>
				<div className="col">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637880670/Servicios_cjzwte.jpg"
						className="rounded float-end menuImg"
						alt="..."
					/>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637880670/Muestras_oqwwsp.jpg"
						className="rounded float-start menuImg"
						alt="..."
					/>
				</div>
				<div className="col">
					<h2>Muestras</h2>
					<hr />
					<h3>Test</h3>
					<h3>test</h3>
					<h3>test</h3>
				</div>
			</div>
		</div>
	);
};
