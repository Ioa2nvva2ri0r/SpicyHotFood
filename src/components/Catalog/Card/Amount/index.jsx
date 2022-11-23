import React from 'react';
// Check Types
import PropTypes from 'prop-types';

const Amount = ({ amount, funAmount, className }) => {
  return (
    <div className={className.amount__box}>
      <button
        className={className.amount__btn_plus}
        onClick={() => funAmount('+')}
        aria-label="Добавить"
      >
        +
      </button>
      <strong className={className.amount}>{amount}</strong>
      <button
        className={className.amount__btn_minus}
        onClick={() => funAmount('-')}
        aria-label="Отнять"
      >
        −
      </button>
    </div>
  );
};

Amount.propTypes = {
  amount: PropTypes.number,
  funAmount: PropTypes.func,
  className: PropTypes.object,
};

export default Amount;
