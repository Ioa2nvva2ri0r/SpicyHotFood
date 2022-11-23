import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../../App';

const Desc = ({ className }) => {
  // React-Context
  const { order, userOrder } = React.useContext(AppContext);

  return userOrder.active === 'order' ? (
    <div className={className.desc__box}>
      <h2 className={className.title}>
        {order.complete ? 'Оформить заказ' : 'Заказать звонок'}
      </h2>
      <p className={className.desc}>
        Заполните пожалуйста поля формы и мы обязательно свяжемся с вами в
        ближайшее время.
      </p>
    </div>
  ) : (
    <h2 className={className.title}>
      {userOrder.active === 'user'
        ? 'Авторизация'
        : userOrder.active === 'create'
        ? 'Новый пользователь'
        : userOrder.active === 'change'
        ? 'Изменить пользователя'
        : ''}
    </h2>
  );
};

Desc.propTypes = {
  className: PropTypes.object,
};

export default Desc;
