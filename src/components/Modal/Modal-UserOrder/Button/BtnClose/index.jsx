import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../../../App';
// Auxiliary Functions
import { animationClose } from '../../../../../auxiliary-functions/AnimationClose';
// Components
import IconClose from '../../../Modal-icon/IconClose';

const BtnClose = ({ elemDOM, className }) => {
  // React-Context
  const { order, userOrder } = React.useContext(AppContext);

  const onClickBtnClose = () => {
    order.funComplete(false);
    animationClose(elemDOM.current, userOrder.funModal, className.main__close);
  };

  return (
    <button
      className={`${className.btn} ${className.btn__close}`}
      onClick={() => onClickBtnClose()}
      type="button"
      aria-label="Закрыть модальное окно"
    >
      <IconClose icon="circle" />
    </button>
  );
};

BtnClose.propTypes = {
  elemDOM: PropTypes.object,
  funCompleteOrder: PropTypes.func,
  className: PropTypes.object,
};

export default BtnClose;
