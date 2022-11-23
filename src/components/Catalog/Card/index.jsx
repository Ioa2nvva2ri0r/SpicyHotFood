import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import { calculationCost } from '../../../auxiliary-functions/CalculationCost';
import { quantityChangeProduct } from '../../../auxiliary-functions/ChangeValue';
// Components
import Picture from './Picture';
import Nutrients from './Nutrients';
import ContentTop from './Content-top';
import Size from './Size';
import Preloader from './Preloader';
import Price from './Price';
import BasketFavorite from './Basket-Favorite';
import Amount from './Amount';
// Styles
import styles from './card.module.scss';

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
  const [prodAmount, setProdAmount] = React.useState(1);
  const [prodSize, setProdSize] = React.useState('');
  const [prodBasket, setProdBasket] = React.useState(false);
  const [prodFavorite, setProdFavorite] = React.useState(false);
  const [finalCost, setFinalCost] = React.useState(0);

  React.useEffect(() => {
    setProdAmount(amount);
    setProdSize(size);
    setProdBasket(basket);
    setProdFavorite(favorite);
    setFinalCost(calculationCost(name, amount, size, price));
  }, [name, amount, size, price, basket, favorite]);

  const onClickBtnAmount = (symbol) => {
    const value = name.toLowerCase();

    const quantityChangeByType = (objType) => {
      return quantityChangeProduct(
        objType,
        prodAmount,
        symbol,
        value.includes('суши') || value.includes('ролл') ? 2 : 1,
        value.includes('суши') || value.includes('ролл') ? 7 : 2,
        value.includes('суши') || value.includes('ролл') ? 15 : 9
      );
    };

    quantityChangeByType({ type: 'fun', variable: setProdAmount });
    setFinalCost(
      calculationCost(
        name,
        value.includes('суши') || value.includes('ролл')
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
    setFinalCost(calculationCost(name, amount, value, price));

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
