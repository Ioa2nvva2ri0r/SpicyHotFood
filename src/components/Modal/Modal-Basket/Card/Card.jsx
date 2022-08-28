import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
// Context
import { AppContext } from '../../../../App';
// Auxiliary Functions
import { calculationCost } from '../../../../auxiliary-functions/CalculationCost';
// Components
import IconClose from '../../Modal-icon/IconClose';
// Styles
import styles from './card.module.scss';

const ModalCard = ({ id, category, name, src, price, amount, size }) => {
  // React-Context
  const { basket } = React.useContext(AppContext);

  const arrayDesc = [
    {
      name: 'Цена:',
      desc: `${calculationCost(category, amount, size, price)} руб.`,
    },
    category === 'Пицца'
      ? {
          name: 'Размер:',
          desc:
            size === 'littel'
              ? '30 см.'
              : size === 'middle'
              ? '35 см.'
              : '40 см.',
        }
      : null,
    { name: 'Количество:', desc: `${amount} шт.` },
  ].filter((el) => el != null);

  return (
    <article className={styles.main}>
      <picture className={styles.img__box}>
        <source className={styles.img} srcSet={src} />
        <img className={styles.img} src={src} alt={name} />
      </picture>
      <div className={styles.content__box}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.content}>
          {arrayDesc.map((obj) => (
            <span key={nanoid()}>
              <strong>{obj.name}</strong>
              {obj.desc}
            </span>
          ))}
        </p>
      </div>
      <button
        className={`${styles.btn} card__btn-close`}
        onClick={() =>
          basket.funChange({
            method: 'DELETE',
            category: 'basket',
            data: { name, id },
          })
        }
      >
        <IconClose icon="circle" />
      </button>
    </article>
  );
};

ModalCard.propTypes = {
  id: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
  size: PropTypes.string,
};

export default ModalCard;
