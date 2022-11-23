import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
// Context
import { AppContext } from '../../../../App';
// Auxiliary Functions
import { animationClose } from '../../../../auxiliary-functions/AnimationClose';
import { smoothScroll } from '../../../../auxiliary-functions/SmoothScroll';
// Components
import MessageCatalog from '../../../Catalog/Message';

const Message = ({ elemDOM, className }) => {
  // React-Context
  const { category, basket } = React.useContext(AppContext);

  const onClickBtnYummy = () => {
    animationClose(elemDOM.current, basket.funModal, className.main__close);
    category.funCategory('Популярные');
    setTimeout(() => {
      smoothScroll('#category', 100);
    }, 400);
  };

  return (
    <div className={className.message__box}>
      <MessageCatalog
        content="Увы но тут пусто..."
        className={className.message}
      />
      <Link
        to="/"
        className={className.link__yummy}
        onClick={() => onClickBtnYummy()}
      >
        За вкусняшкой!
      </Link>
    </div>
  );
};

Message.propTypes = {
  elemDOM: PropTypes.object,
  className: PropTypes.object,
};

export default Message;
