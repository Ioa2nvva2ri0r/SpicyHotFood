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
  const { basket, order } = React.useContext(AppContext);

  const onCloseModal = () => {
    order.funComplete(false);
    animationClose(elemDOM.current, basket.funModal, className.main__close);
  };

  return (
    <button
      className={`${className.btn} ${className.btn__close}`}
      onClick={() => onCloseModal()}
    >
      <IconClose icon="square" />
    </button>
  );
};

BtnClose.propTypes = {
  elemDOM: PropTypes.object,
  className: PropTypes.object,
};

export default BtnClose;
