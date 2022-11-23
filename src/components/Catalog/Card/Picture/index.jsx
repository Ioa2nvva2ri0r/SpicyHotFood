import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Image
import lazyImg from './lazy-img.svg';

const Picture = ({ src, alt, className }) => {
  return (
    <picture>
      <source
        className={`${className.img} lazyload`}
        srcSet={lazyImg}
        data-srcset={src}
      />
      <img
        className={`${className.img} lazyload`}
        src={lazyImg}
        data-src={src}
        alt={alt}
      />
    </picture>
  );
};

Picture.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.object,
};

export default Picture;
