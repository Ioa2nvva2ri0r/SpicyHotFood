import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Components
import IconPreloader from '../Card-icon/IconPreloader';

const Preloader = ({ className }) => {
  return (
    <div className={className}>
      <IconPreloader />
    </div>
  );
};

Preloader.propTypes = {
  className: PropTypes.string,
};

export default Preloader;
