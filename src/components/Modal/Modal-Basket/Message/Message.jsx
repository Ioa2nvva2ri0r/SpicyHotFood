import React from 'react';
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../../App';
// Auxiliary Functions
import { animationClose } from '../../../../auxiliary-functions/AnimationClose';
import { smoothScroll } from '../../../../auxiliary-functions/SmoothScroll';
// Components
import IconSmile from '../../../Catalog/Catalog-icon/IconSmile';

const Message = ({ elemDOM, className }) => {
  // React-Context
  const { basket } = React.useContext(AppContext);

  const onClickBtnYummy = () => {
    animationClose(elemDOM.current, basket.funModal, className.main__close);
    setTimeout(() => {
      smoothScroll('#category', 100);
    }, 400);
  };

  return (
    <div className={className.message__box}>
      <p className={className.message}>
        Увы но тут пусто... <IconSmile />
      </p>
      <button
        className={`${className.btn} ${className.btn__yummy}`}
        onClick={() => onClickBtnYummy()}
      >
        За вкусняшкой!
      </button>
    </div>
  );
};

Message.propTypes = {
  elemDOM: PropTypes.object,
  className: PropTypes.object,
};

export default Message;
