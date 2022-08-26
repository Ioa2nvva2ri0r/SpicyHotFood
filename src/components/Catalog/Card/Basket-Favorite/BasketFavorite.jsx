import React from 'react';
import PropTypes from 'prop-types';
// Components
import IconFavorite from '../Card-icon/IconFavorite';
import IconBasket from '../Card-icon/IconBasket';

const BasketFavorite = ({
  activeFavorite,
  activeBasket,
  funFavorite,
  funBasket,
  className,
}) => {
  return (
    <div className={className.btn__container_BasketFavorite}>
      <button
        className={className.btn__favorite}
        onClick={funFavorite}
        aria-label="Добавить в закладки"
      >
        <IconFavorite active={activeFavorite} />
      </button>
      <button
        className={className.btn__basket}
        onClick={funBasket}
        aria-label="Добавить в корзину"
      >
        <IconBasket active={activeBasket} />
      </button>
    </div>
  );
};

BasketFavorite.propTypes = {
  activeFavorite: PropTypes.bool,
  activeBasket: PropTypes.bool,
  funFavorite: PropTypes.func,
  funBasket: PropTypes.func,
  className: PropTypes.object,
};

export default BasketFavorite;
