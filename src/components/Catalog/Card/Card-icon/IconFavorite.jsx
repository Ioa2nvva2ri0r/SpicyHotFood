import React from 'react';
import PropTypes from 'prop-types';

const IconFavorite = ({ active }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21px"
      height="21px"
      viewBox="0 0 21 21"
    >
      <path
        d="M 10.5 4.683594 C 9.53125 3.070312 7.914062 1.9375 5.976562 1.9375 C 3.230469 1.9375 1.128906 4.039062 1.128906 6.785156 C 1.128906 12.117188 4.039062 12.921875 10.5 19.0625 C 16.960938 12.921875 19.871094 12.117188 19.871094 6.785156 C 19.871094 4.039062 17.769531 1.9375 15.023438 1.9375 C 13.085938 1.9375 11.46875 3.070312 10.5 4.683594 Z M 10.5 4.683594 "
        fill={active ? '#ff6f6f' : 'transparent'}
        stroke={active ? '#ff6f6f' : '#D3D3D3'}
        strokeWidth="2"
      />
    </svg>
  );
};

IconFavorite.propTypes = {
  active: PropTypes.bool,
};

export default IconFavorite;
