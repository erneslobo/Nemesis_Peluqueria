import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export const Carrusel = () => {
	return (
		<div className=" container-fluid my-5 p-5">
			<Splide
				options={{
					type: "loop",
					drag: "free",
					perPage: 3,
					breakpoints: {
						640: {
							perPage: 1
						}
					}
				}}>
				<SplideSlide>
					<div className="splideImage">
						<img
							src="https://res.cloudinary.com/erneslobo/image/upload/v1637861944/Salon6_nmr29u.jpg"
							alt="Image 1"
						/>
					</div>
				</SplideSlide>
				<SplideSlide>
					<div className="splideImage">
						<img
							src="https://res.cloudinary.com/erneslobo/image/upload/v1637861944/Salon6_nmr29u.jpg"
							alt="Image 1"
						/>
					</div>
				</SplideSlide>
				<SplideSlide>
					<div className="splideImage">
						<img
							src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon4_zt8cw7.jpg"
							alt="Image 1"
						/>
					</div>
				</SplideSlide>
				<SplideSlide>
					<div className="splideImage">
						<img
							src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon1_a8yx7m.png"
							alt="Image 1"
						/>
					</div>
				</SplideSlide>
				<SplideSlide>
					<div className="splideImage">
						<img
							src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon5_eblcut.jpg"
							alt="Image 1"
						/>
					</div>
				</SplideSlide>
				<SplideSlide>
					<div className="splideImage">
						<img
							src="https://res.cloudinary.com/erneslobo/image/upload/v1637861943/Salon3_i0yak1.jpg"
							alt="Image 1"
						/>
					</div>
				</SplideSlide>
			</Splide>
		</div>
	);
};
