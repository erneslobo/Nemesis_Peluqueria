import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "../../styles/checkout.scss";
import Horizontal_card from "../component/horizontal_card";
import logo_mercadopago from "../../img/logo_mercadopago.png";

import { Context } from "../store/appContext";

export const Checkout = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const [confirmada, setConfirmada] = useState(false);
	const [total, setTotal] = useState(0);

	const calcularTotal = () => {
		let resultado = store.items_carrito.reduce(
			(aPagar, subtotal) =>
				(aPagar = aPagar + parseInt(subtotal.articulo.quantity) * parseInt(subtotal.articulo.unit_price)),
			0
		);

		setTotal(resultado);
	};

	useEffect(
		() => {
			calcularTotal();
			setConfirmada(false);
		},
		[store.items_carrito]
	);

	return (
		<>
			<h2 className="text-center pt-4">Mi Carrito</h2>
			<div className="container pt-2">
				<p className="lead pl-3 font-weight-bold">Artículos a Comprar</p>

				<div className="row container">
					<div className="col-8">
						<div className="card horizontal-card mb-3 p-2 ps-4">
							<div className="row">
								<div className="col-5 ">
									<b>
										TOTAL COMPRAS ({store.items_carrito.length} ITEMS): ${total}
									</b>
								</div>
								<div className="col-3 text-center">
									<b>CANTIDAD</b>
								</div>
								<div className="col-3 text-center">
									<b>SUBTOTAL</b>
								</div>
							</div>
						</div>

						{store.items_carrito.map((item, index) => {
							return (
								<Horizontal_card
									item={item}
									key={index}
									id={index}
									recalcularTotal={calcularTotal}
									confirmada={confirmada}
								/>
							);
						})}
					</div>

					<div className="col-4 ">
						<div className="card card-detalle mb-0 d-flex flex-column justify-content-between container">
							<div>
								<div className="mt-3">
									<b>RESUMEN DE LA ORDEN</b>
								</div>
								<hr />
								<div className="d-flex justify-content-between">
									<div>SUBTOTAL </div>
									<div>${Math.round(total / 1.22)}</div>
								</div>
								<div className="d-flex justify-content-between mt-3">
									<div>IVA (22%) </div>
									<div>${total - Math.round(total / 1.22)}</div>
								</div>
								<hr />
								<div className="d-flex justify-content-between">
									<div>
										<b>TOTAL</b>{" "}
									</div>
									<div>
										<b>${total}</b>
									</div>
								</div>
							</div>
							<div className="d-flex">
								{confirmada ? (
									<>
										<div className="d-flex justify-content-around align-items-center mb-3 pagar">
											<img className="img-fluid" src={logo_mercadopago} alt="..." />
											<div id="button-checkout" />
										</div>
									</>
								) : (
									<button
										type="submit"
										className="btn btn-dark mb-3"
										onClick={() => {
											if (Object.keys(store.usuario_actual).length > 0) {
												setConfirmada(true);
												actions.pagarMercadoPago(store.items_carrito);
											} else {
												history.push("/login");
											}
										}}>
										Confirmar compra!
									</button>
								)}
							</div>
						</div>
						<div className="mt-3 horizontal-card">
							{confirmada ? (
								<div>
									<button
										className="btn btn-dark mb-3"
										onClick={() => {
											setConfirmada(false);
										}}>
										Editar compra
									</button>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
