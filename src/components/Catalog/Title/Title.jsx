import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ title, desc, className }) => {
  return (
    <h2 className={className.title} id="category">
      <span>
        {title} <span className={className.title__quotes}>«</span>
        <strong className={className.title__desc}>{desc}</strong>
        <span className={className.title__quotes}>»</span>
      </span>
    </h2>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  className: PropTypes.object,
};

export default Title;
