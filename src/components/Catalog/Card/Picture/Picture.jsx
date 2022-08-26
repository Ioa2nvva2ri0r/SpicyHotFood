import React from 'react';
import PropTypes from 'prop-types';

const Picture = ({ src, alt, className }) => {
  return (
    <picture>
      <source className={className.img} srcSet={src} />
      <img className={className.img} src={src} alt={alt} />
    </picture>
  );
};

Picture.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.object,
};

export default Picture;
