import React from 'react';
import logo from 'assets/images/icons/logo.png';

const Logo = () => {
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '9rem'
  };

  return (
    <div style={containerStyles}>
      <img src={logo} alt="STOK" width="500" />
    </div>
  );
};
export default Logo;
