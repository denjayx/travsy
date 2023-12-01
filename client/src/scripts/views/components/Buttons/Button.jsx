// eslint-disable-next-line react/prop-types
const Button = ({variant, children, ...props}) => {
	const variants = {
		primary: "bg-primary-500 text-gray-0 border border-primary-500 shadow-btn hover:bg-primary-600 duration-300 ease-in-out",
		secondary: "bg-gray-0 text-primary-500 border border-primary-500 shadow-btn hover:bg-primary-100 duration-300 ease-in-out",
		text: "text-primary-700 text-left",
	};

	const className = `py-3 px-6 rounded-full ${variants[variant]}`;

	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export default Button;
