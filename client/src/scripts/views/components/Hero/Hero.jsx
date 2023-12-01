/* eslint-disable react/no-unknown-property */
import {NavLink} from "react-router-dom";
import Button from "../Buttons/Button";
import HeroImage from "../../../../assets/hero-image.png";
import HeroIcon from "../../../../assets/hero-icon.png";

const Hero = () => {
	return (
		<section className="container flex flex-col lg:flex-row justify-between items-center mt-10">
			<div className="flex flex-col gap-8 lg:w-6/12 h-full">
				<h1 className="text-3xl font-bold text-primary-950">
					Solusi healing <span className="text-primary-700">tanpa pusing.</span>
				</h1>
				<p className="text-base text-gray-700">Jelajahi keindahan pulau Bali dengan pilihan destinasi menarik dari kami. Setiap tempat memiliki cerita dan keunikan tersendiri yang menunggu untuk Anda temukan.Yuk segera pesan layanan kami.</p>
				<div className="flex gap-2">
					<NavLink to="/package">
						<Button variant="secondary">Mulai Trip</Button>
					</NavLink>
					<NavLink to="/register">
						<Button variant="primary">Jadi Tourguide</Button>
					</NavLink>
				</div>
				<div className="flex justify-start items-center gap-2 mt-12">
					<svg class="w-2 h-2 text-primary-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
					</svg>
					<Button className="w-fit text-primary-700">Jelajahi</Button>
				</div>
			</div>
			<div className="hero-image lg:w-5/12 relative">
				<img src={HeroIcon} alt="Plans Icon" className="absolute inset-x-0 top-28 left-24" />
				<img src={HeroImage} alt="Hero" className="w-full hidden lg:block" />
			</div>
		</section>
	);
};

export default Hero;
