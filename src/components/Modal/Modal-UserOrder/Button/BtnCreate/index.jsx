import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../../../App';

const BtnCreate = ({ funLoading, className }) => {
  // React-Context
  const { userOrder } = React.useContext(AppContext);

  const onClickBtnCreate = () => {
    funLoading(true);
    setTimeout(() => {
      funLoading(false);
      userOrder.funActive('create');
    }, 500);
  };

  return (
    userOrder.active === 'user' && (
      <button
        className={`${className.btn} ${className.btn__create}`}
        onClick={() => onClickBtnCreate()}
        type="button"
      >
        Создать новый аккаунт
      </button>
    )
  );
};

BtnCreate.propTypes = {
  funLoading: PropTypes.func,
  className: PropTypes.object,
};

export default BtnCreate;
