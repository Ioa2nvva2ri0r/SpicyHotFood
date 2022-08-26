import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, funMessage, className }) => {
  const [classClose, setClassClose] = React.useState('');
  const messageClose = () =>
    setTimeout(() => {
      setClassClose(className.messageErr__close);
      setTimeout(() => funMessage(''), 395);
    }, 4000);

  React.useEffect(() => {
    messageClose();
  }, [message]);

  return <p className={`${className.messageErr} ${classClose}`}>{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  funMessage: PropTypes.func,
  className: PropTypes.object,
};

export default ErrorMessage;
