const deviceSize = {
  mobile: '450px',
  tablet: '768px',
  labtop: '1024px',
  desktop: '1920px'
};

const colors = {
  primary: '#8675a9',
  success: '#2d884d',
  warning: '#fbc687',
  danger: '#d35d6e',
  white: '#f9f9f9',
  black: '#222831',
  lightGray: '#bebebe',
  gray: '#bbbbbb',
  darkGray: '#393e46'
};

const device = {
  mobile: `only screen and (max-width: ${deviceSize.mobile})`,
  tablet: `only screen and (max-width: ${deviceSize.tablet})`,
  labtop: `only screen and (max-width: ${deviceSize.labtop})`,
  desktop: `only screen and (max-width: ${deviceSize.desktop})`
};

const theme = {
  colors,
  device
};

export default theme;