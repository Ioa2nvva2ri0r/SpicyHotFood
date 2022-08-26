import React from 'react';
import PropTypes from 'prop-types';

const Price = ({ price, className }) => {
  return (
    <strong className={className.price}>
      Цена:
      <br />
      {price} руб.
    </strong>
  );
};

Price.propTypes = {
  price: PropTypes.number,
  className: PropTypes.object,
};

export default Price;
