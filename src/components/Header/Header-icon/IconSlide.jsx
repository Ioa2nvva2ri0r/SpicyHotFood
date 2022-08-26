import React from 'react';
import PropTypes from 'prop-types';

const IconSlide = ({ rotate }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25px"
      height="25px"
      viewBox="0 0 25 25"
      style={{ transform: `rotate(${rotate ? 180 : 0}deg)` }}
    >
      <path
        d="M 40.5 17 L 87.5 64 "
        transform="matrix(0.195312,0,0,0.195312,0,0)"
        strokeWidth="18"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        stroke="#fff"
      />
      <path
        d="M 87.5 64 L 40.5 111 "
        transform="matrix(0.195312,0,0,0.195312,0,0)"
        strokeWidth="18"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        stroke="#fff"
      />
    </svg>
  );
};

IconSlide.propTypes = {
  rotate: PropTypes.bool,
};

export default IconSlide;
