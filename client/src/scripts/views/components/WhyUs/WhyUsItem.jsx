/* eslint-disable react/prop-types */
const WhyUsItem = ({imageUrl, title}) => {
	return (
		<div className="relative flex justify-center items-center h-20 rounded-lg overflow-hidden">
			<img className="object-cover w-full brightness-75" src={imageUrl} alt={`${title} image`} />
			<span className="absolute text-md text-white w-fit block inset-x-0 mx-auto ">{title}</span>
		</div>
	);
};

export default WhyUsItem;
