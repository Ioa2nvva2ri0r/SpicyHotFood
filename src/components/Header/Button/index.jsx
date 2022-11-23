import React from 'react';
// Check Types
import PropTypes from 'prop-types';

const BtnNav = ({ id, content, funNav, ariaLabel, className }) => {
  return (
    <button
      id={id}
      className={className}
      onClick={funNav}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

BtnNav.propTypes = {
  id: PropTypes.string,
  content: PropTypes.node,
  funNav: PropTypes.func,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};

export default BtnNav;
