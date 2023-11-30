const Button = ({ variant, href, children, className}) => {
  let classes = `${className} py-3 px-6 rounded-full`;

  if (variant === 'primary') {
    classes += ' bg-primary-500 text-gray-0 border border-primary-500 hover:bg-primary-600 duration-300 ease-in-out';
  } else if (variant === 'secondary') {
    classes += ' bg-gray-0 text-primary-500 border border-primary-500 hover:bg-primary-100 duration-300 ease-in-out';
  } else if (variant === 'text') {
    classes += ' text-primary-700 text-left';
  }

  const ButtonElement = href ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <button className={classes}>{children}</button>
  );

  return ButtonElement;
};

export default Button