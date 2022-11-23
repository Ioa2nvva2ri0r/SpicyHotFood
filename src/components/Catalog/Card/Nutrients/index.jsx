import React from 'react';
// Check Types
import PropTypes from 'prop-types';

const Nutrients = ({ nutrients, className }) => {
  return (
    <p className={className.nutrients}>
      <span>На 100 грамм продукта:</span>
      <span>
        <span className={className.nutrients__title}>Ккал</span> -{' '}
        {nutrients.ENERC_KCAL}
      </span>
      <span>
        <span className={className.nutrients__title}>Белка</span> -{' '}
        {nutrients.PROCNT}
      </span>
      <span>
        <span className={className.nutrients__title}>Жиров</span> -{' '}
        {nutrients.FAT}
      </span>
      <span>
        <span className={className.nutrients__title}>Углеводов</span> -{' '}
        {nutrients.CHOCDF}
      </span>
      {nutrients.FIBTG ? (
        <span>
          <span className={className.nutrients__title}>Клетчатки</span> -{' '}
          {nutrients.FIBTG}
        </span>
      ) : null}
    </p>
  );
};

Nutrients.propTypes = {
  nutrients: PropTypes.object,
  className: PropTypes.object,
};

export default Nutrients;
