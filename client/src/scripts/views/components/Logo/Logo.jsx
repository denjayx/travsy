/* eslint-disable react/prop-types */
import LogoBlue from '../../../../assets/logo.svg'
import LogoWhite from '../../../../assets/logo-white.svg'

const Logo = ({ variant }) => {
  let logo = LogoBlue

  if (variant === 'blue') {
    logo = LogoBlue
  } else if (variant === 'white') {
    logo = LogoWhite
  }

  return <img src={logo} alt={`logo ${variant}`} width="98" height="40" />
}

export default Logo
