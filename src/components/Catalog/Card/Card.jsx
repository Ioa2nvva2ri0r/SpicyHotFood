import React from 'react';
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import { calculationCost } from '../../../auxiliary-functions/CalculationCost';
import { quantityChangeProduct } from '../../../auxiliary-functions/ChangeValue';
// Components
import Picture from './Picture/Picture';
import Nutrients from './Nutrients/Nutrients';
import ContentTop from './Content-top/ContentTop';
import Size from './Size/Size';
import Preloader from './Preloader/Preloader';
import Price from './Price/Price';
import BasketFavorite from './Basket-Favorite/BasketFavorite';
// Styles
import styles from './card.module.scss';
import Amount from './Amount/Amount';

const Card = ({
  id,
  category,
  name,
  ingredients,
  src,
  nutrients,
  weight,
  price,
  amount,
  size,
  basket,
  favorite,
  activeCard,
}) => {
  // React-Context
  const state = React.useContext(AppContext);
  // React-State
  const [prodAmount, setProdAmount] = React.useState(amount);
  const [prodSize, setProdSize] = React.useState(size);
  const [prodBasket, setProdBasket] = React.useState(basket);
  const [prodFavorite, setProdFavorite] = React.useState(favorite);
  const [finalCost, setFinalCost] = React.useState(
    calculationCost(category, amount, size, price)
  );

  const onClickBtnAmount = (symbol) => {
    const quantityChangeByType = (objType) => {
      return quantityChangeProduct(
        objType,
        prodAmount,
        symbol,
        category === 'Суши' ? 2 : 1,
        category === 'Суши' ? 7 : 2,
        category === 'Суши' ? 15 : 9
      );
    };

    quantityChangeByType({ type: 'fun', variable: setProdAmount });
    setFinalCost(
      calculationCost(
        category,
        category === 'Суши'
          ? quantityChangeByType({ type: 'var', variable: prodAmount })
          : amount,
        prodSize,
        price
      )
    );

    if (prodBasket)
      state.basket.funChange({
        method: 'PUT',
        category: 'basket',
        data: {
          id,
          name,
          amount: quantityChangeByType({ type: 'var', variable: prodAmount }),
        },
      });
  };

  const onClickBtnSize = (value) => {
    setProdSize(value);
    setFinalCost(calculationCost(category, amount, value, price));

    if (prodBasket)
      state.basket.funChange({
        method: 'PUT',
        category: 'basket',
        data: {
          id,
          name,
          size: value,
        },
      });
  };

  const onClickBtnBasket = () => {
    setProdBasket(!prodBasket);
    prodBasket
      ? state.basket.funChange({
          method: 'DELETE',
          category: 'basket',
          data: { name, id },
        })
      : state.basket.funChange({
          method: 'POST',
          category: 'basket',
          data: {
            id,
            category,
            name,
            ingredients,
            src,
            nutrients,
            weight,
            price,
            amount: prodAmount,
            size: prodSize,
            basket: !prodBasket,
            favorite: prodFavorite,
          },
        });
  };

  const onClickBtnFavorite = () => {
    setProdFavorite(!prodFavorite);
    prodFavorite
      ? state.basket.funChange({
          method: 'DELETE',
          category: 'favorite',
          data: { name, id },
        })
      : state.basket.funChange({
          method: 'POST',
          category: 'favorite',
          data: {
            id,
            category,
            name,
            ingredients,
            src,
            nutrients,
            weight,
            price,
            amount: prodAmount,
            size: prodSize,
            basket: prodBasket,
            favorite: !prodFavorite,
          },
        });
  };

  return id ? (
    <article
      className={`${styles.main} ${
        activeCard !== '' ? styles.main__active : ''
      }`}
    >
      <div className={styles.img__box}>
        <Picture src={src} alt={name} className={styles} />
        <Nutrients nutrients={nutrients} className={styles} />
      </div>
      <div className={styles.content}>
        <ContentTop
          title={name}
          ingredients={ingredients.toLowerCase()}
          className={styles}
        />
        <div className={styles.content__Bottom}>
          <Size
            size={prodSize}
            weight={weight}
            funSize={onClickBtnSize}
            className={styles}
          />
          <div className={styles.price__box}>
            <Price price={finalCost} className={styles} />
            <div className={styles.btn__container}>
              <BasketFavorite
                activeFavorite={prodFavorite}
                activeBasket={prodBasket}
                funFavorite={onClickBtnFavorite}
                funBasket={onClickBtnBasket}
                className={styles}
              />
              <Amount
                amount={prodAmount}
                funAmount={onClickBtnAmount}
                className={styles}
              />
            </div>
          </div>
        </div>
      </div>
      {state.API.loading ? <Preloader className={styles.loading} /> : null}
    </article>
  ) : (
    <Preloader className={`${styles.main} ${styles.main__preloader}`} />
  );
};

Card.propTypes = {
  id: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  ingredients: PropTypes.string,
  weight: PropTypes.number,
  src: PropTypes.string,
  nutrients: PropTypes.object,
  price: PropTypes.number,
  amount: PropTypes.number,
  size: PropTypes.string,
  basket: PropTypes.bool,
  favorite: PropTypes.bool,
  activeCard: PropTypes.string,
};

export default Card;
