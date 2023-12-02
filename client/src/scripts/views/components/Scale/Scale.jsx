import ScaleItem from "./ScaleItem";
import ActiveUserIcon from "../../../../assets/users.png";
import DestinationIcon from "../../../../assets/maps.png";
import TourGuideIcon from "../../../../assets/tourguide.png";

const Scale = () => {
	const scaleItems = [
		{
			userImage: ActiveUserIcon,
			count: 130,
			title: "Pengguna Aktif",
		},
		{
			userImage: DestinationIcon,
			count: 24,
			title: "Tempat Wisata",
		},
		{
			userImage: TourGuideIcon,
			count: 48,
			title: "Pemandu Wisata",
		},
	];

	return (
		<section className="container mt-24 flex w-full flex-col justify-center items-center">
			<h3 className="text-xl text-primary-950 font-bold">Skala Travsy</h3>
			<div className="flex md:justify-center gap-4 md:gap-12 mt-6 overflow-x-scroll w-full">
				{scaleItems.map((item, index) => (
					<ScaleItem key={index} userImage={item.userImage} count={item.count} title={item.title} />
				))}
			</div>
		</section>
	);
};

export default Scale;
