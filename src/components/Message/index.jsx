import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Auxiliary Functions
import { animationClose } from '../../auxiliary-functions/AnimationClose';
// Styles
import styles from './message.module.scss';

const Message = ({ message, funMessage }) => {
  const messageRef = React.useRef();

  React.useEffect(() => {
    if (messageRef.current !== undefined) {
      const closeMessage = () =>
        setTimeout(() => {
          if (messageRef.current !== null)
            animationClose(messageRef.current, funMessage, styles.main__close);
        }, 5000);

      if (message) {
        clearTimeout(closeMessage);
        closeMessage();
      } else {
        clearTimeout(closeMessage);
      }
    }
  }, [message]);

  return (
    <div ref={messageRef} className={styles.main}>
      <p>{message}</p>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  funMessage: PropTypes.func,
};

export default Message;
