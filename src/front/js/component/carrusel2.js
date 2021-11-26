import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.scss";
import React from "react";
import Slider from "react-slick";

export const Carrusel2 = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		adaptiveHeight: true
	};

	return (
		<div>
			<Slider {...settings}>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637861944/Salon6_nmr29u.jpg"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637861944/Salon7_wozf1k.jpg"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon4_zt8cw7.jpg"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon1_a8yx7m.png"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon5_eblcut.jpg"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon2_rqxn8c.jpg"
						alt="Image 1"
					/>
				</div>
			</Slider>
		</div>
	);
};
