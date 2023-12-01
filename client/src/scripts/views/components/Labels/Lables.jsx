/* eslint-disable react/prop-types */
const Labels = ({children, ...props}) => {
	const className = `bg-primary-50 py-2 px-4 rounded-full text-xs text-primary-700`;
	return (
		<>
			<span className={className} {...props}>
				{children}
			</span>
		</>
	);
};

export default Labels;
