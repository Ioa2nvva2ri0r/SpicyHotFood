import React from 'react';
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../../../App';

const BtnExitDelete = ({ funDelete, funLoading, className }) => {
  // React-Context
  const { userOrder } = React.useContext(AppContext);

  const onClickBtn = (event) => {
    funLoading(true);
    setTimeout(() => {
      event === 'exit'
        ? localStorage.removeItem('user')
        : (funDelete({
            path: 'user',
            method: 'DELETE',
            id: JSON.parse(localStorage.getItem('user')).id,
            process: 'delete',
          }),
          localStorage.removeItem('user'));
      funLoading(false);
      userOrder.funActive('user');
    }, 500);
  };

  return (
    userOrder.active === 'change' && (
      <div className={className.btn__box_exitDelete}>
        <button
          className={`${className.btn} ${className.btn__exit}`}
          onClick={() => onClickBtn('exit')}
          type="button"
        >
          Выход
        </button>
        <button
          className={`${className.btn} ${className.btn__delete}`}
          onClick={() => onClickBtn('delete')}
          type="button"
        >
          Удалить
        </button>
      </div>
    )
  );
};

BtnExitDelete.propTypes = {
  funDelete: PropTypes.func,
  funLoading: PropTypes.func,
  className: PropTypes.object,
};

export default BtnExitDelete;
