import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.scss";
import React from "react";
import Slider from "react-slick";

export const Carrusel2 = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 2,
		adaptiveHeight: true
	};

	return (
		<div>
			<Slider {...settings}>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/dhcdkw7os/image/upload/v1637977929/Index/20211124_122429_dpxia3.jpg"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/dhcdkw7os/image/upload/v1637977953/Index/20211124_122008_mk0pij.jpg"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/dhcdkw7os/image/upload/v1637977933/Index/20211124_122448_amaobz.jpg"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/dhcdkw7os/image/upload/v1637977931/Index/20211124_122513_r7t58n.jpg"
						alt="Image 1"
					/>
				</div>
				<div className="splideImage">
					<img
						src="https://res.cloudinary.com/dhcdkw7os/image/upload/v1637977930/Index/20211124_121758_bbth9c.jpg"
						alt="Image 1"
					/>
				</div>
				{/* <div className="splideImage">
					<img
						src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon2_rqxn8c.jpg"
						alt="Image 1"
					/>
				</div> */}
			</Slider>
		</div>
	);
};
