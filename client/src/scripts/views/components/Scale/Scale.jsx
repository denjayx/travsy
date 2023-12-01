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
		<section className="container mt-14">
			<h3 className="text-xl text-primary-950 font-bold">Skala Travsy</h3>
			<div className="flex gap-4 mt-6 overflow-x-scroll">
				{scaleItems.map((item, index) => (
					<ScaleItem key={index} userImage={item.userImage} count={item.count} title={item.title} />
				))}
			</div>
		</section>
	);
};

export default Scale;
