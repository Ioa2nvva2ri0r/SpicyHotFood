import React from 'react';
import PropTypes from 'prop-types';

const ContentTop = ({ title, ingredients, className }) => {
  return (
    <div className={className.content__top}>
      <h2 className={className.title}>{title}</h2>
      <p className={className.desc}>
        <strong>Ингредиенты:</strong> {ingredients}.
      </p>
    </div>
  );
};

ContentTop.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.string,
  className: PropTypes.object,
};

export default ContentTop;
