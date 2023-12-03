
import Hero from "../components/Hero/Hero";
import PopularPackage from "../components/Popular/PopularPackage";
import Scale from "../components/Scale/Scale";
import WhyUs from "../components/WhyUs/WhyUs";
import Footer from "../components/Footer/footer";

export default function Homepage() {
	return (
		<>
			<Hero />
			<PopularPackage />
			<Scale />
			<WhyUs />
			<Footer/>
		</>
	);
}
