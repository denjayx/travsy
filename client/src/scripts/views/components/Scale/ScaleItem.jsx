/* eslint-disable react/prop-types */
const ScaleItem = ({userImage, count, title}) => {
	return (
		<div className="flex flex-shrink-0 items-center bg-white rounded-full ps-4 pt-4 pb-4 pe-12 gap-4 border border-primary-500 ">
			<div className="bg-primary-100 rounded-full p-2">
				<img className="w-16 h-16" src={userImage} alt={`${title} icon`} />
			</div>
			<div>
				<h5 className="text-2xl font-bold text-primary-700 leading-8 ">{count}</h5>
				<span className="text-sm text-primary-700">{title}</span>
			</div>
		</div>
	);
};

export default ScaleItem;
