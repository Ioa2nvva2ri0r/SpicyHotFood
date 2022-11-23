import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../../../App';
// Auxiliary Functions
import { animationClose } from '../../../../../auxiliary-functions/AnimationClose';

const BtnOrder = ({ modalElemDOM, orderElemDOM, className }) => {
  // React-Context
  const { basket, order, userOrder, finalCost, discount } =
    React.useContext(AppContext);

  const onClickBtnOrder = (value) => {
    animationClose(
      modalElemDOM.current,
      basket.funModal,
      className.main__close
    );
    userOrder.funModal(true);
    userOrder.funActive(value);
    order.funComplete(true);
  };

  return (
    <div ref={orderElemDOM} className={className.order__box}>
      {[
        { desc: 'Стоимость', value: finalCost },
        { desc: 'Скидка', value: discount },
        {
          desc: 'Итого',
          value: Math.round(finalCost - finalCost * (discount / 100)),
        },
      ].map((obj, id) => (
        <p key={`desc-order-${id + 1}`} className={className.order__desc}>
          <span>{obj.desc}:</span>
          <span>
            {obj.value}{' '}
            {obj.desc === 'Стоимость' || obj.desc === 'Итого' ? 'руб.' : '%'}
          </span>
        </p>
      ))}
      <button
        className={className.order__btn}
        onClick={() => onClickBtnOrder('order')}
      >
        Оформить заказ
      </button>
    </div>
  );
};

BtnOrder.propTypes = {
  modalElemDOM: PropTypes.object,
  orderElemDOM: PropTypes.object,
  className: PropTypes.object,
};

export default BtnOrder;
