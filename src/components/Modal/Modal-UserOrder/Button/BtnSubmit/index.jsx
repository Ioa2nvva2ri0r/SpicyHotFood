import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../../../App';

const BtnSubmit = ({ className }) => {
  // React-Context
  const { userOrder } = React.useContext(AppContext);

  return (
    <button className={`${className.btn} ${className.btn__submit}`}>
      {userOrder.active === 'order'
        ? 'Отправить'
        : userOrder.active === 'user'
        ? 'Войти'
        : userOrder.active === 'create'
        ? 'Создать'
        : userOrder.active === 'change'
        ? 'Изменить'
        : ''}
    </button>
  );
};

BtnSubmit.propTypes = {
  className: PropTypes.object,
};

export default BtnSubmit;
