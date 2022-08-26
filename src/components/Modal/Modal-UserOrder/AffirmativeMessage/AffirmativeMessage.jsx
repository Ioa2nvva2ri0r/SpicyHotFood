import React from 'react';
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../../App';
// Auxiliary Functions
import { animationClose } from '../../../../auxiliary-functions/AnimationClose';

const AffirmativeMessage = ({ elemDOM, message, funMessage, className }) => {
  // React-Context
  const { userOrder } = React.useContext(AppContext);

  setTimeout(() => {
    animationClose(elemDOM.current, userOrder.funModal, className.main__close);
    setTimeout(() => funMessage(''), 400);
  }, 4000);

  return <p className={className.messageAffirmative}>{message}</p>;
};

AffirmativeMessage.propTypes = {
  elemDOM: PropTypes.object,
  message: PropTypes.string,
  funClose: PropTypes.func,
  funMessage: PropTypes.func,
  className: PropTypes.object,
};

export default AffirmativeMessage;
