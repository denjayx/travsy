import CardImage from "../../../../assets/card-image.png";
import Avatar from "../../../../assets/avatar.png";
import Labels from "../Labels/Lables";

const Card = () => {
	return (
		<article className="bg-white max-md:w-full md:w-6/12 lg:w-4/12 rounded-2xl flex flex-col p-6 gap-4 max-xl:flex-shrink-0">
			<figure className="w-full h-64 overflow-hidden rounded-lg">
				<img src={CardImage} alt="Thumbnail Card" className="w-full h-full object-cover" />
			</figure>
			<header className="tourguide flex gap-2 justify-start items-center">
				<img src={Avatar} width="32px" alt="tourguide avatar" className="avatar" />
				<span className="text-sm text-primary-950">Abram Saris</span>
			</header>
			<h4 className="text-md font-semibold text-primary-950">Pura Tanah Lot - Pura Uluwatu - Pantai Kuta</h4>
			<footer>
				<Labels>Tanah Lot</Labels>
				<Labels>Uluwatu</Labels>
				<Labels>Pantai Kuta</Labels>
			</footer>
		</article>
	);
};

export default Card;
