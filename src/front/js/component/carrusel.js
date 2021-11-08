import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export const Carrusel = () => {
	return (
		<div className=" container-fluid my-5 p-5">
			<Splide
				options={{
					rewind: true,
					width: "100%",
					gap: "1rem",
					perPage: 3,
					focus: "center",
					arrows: true,
					lazyLoad: "nearby",
					pagination: "slider",
					trimSpace: true,
					breakpoints: {
						640: {
							perPage: 1
						}
					}
				}}>
				<SplideSlide>
					<img src="https://www.dummyimage.com/300x400" alt="Image 1" />
				</SplideSlide>
				<SplideSlide>
					<img src="https://www.dummyimage.com/300x400" alt="Image 2" />
				</SplideSlide>
				<SplideSlide>
					<img src="https://www.dummyimage.com/300x400" alt="Image 3" />
				</SplideSlide>
				<SplideSlide>
					<img src="https://www.dummyimage.com/300x400" alt="Image 3" />
				</SplideSlide>
				<SplideSlide>
					<img src="https://www.dummyimage.com/300x400" alt="Image 3" />
				</SplideSlide>
				<SplideSlide>
					<img src="https://www.dummyimage.com/300x400" alt="Image 3" />
				</SplideSlide>
			</Splide>
		</div>
	);
};
