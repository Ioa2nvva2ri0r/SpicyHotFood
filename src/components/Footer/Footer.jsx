import React from 'react';
import { nanoid } from 'nanoid';
// Components
import Logo from '../Header/Logo/Logo';
import IconSocials from './Footer-icon/IconSocials';
import IconHeader from '../Header/Header-icon/IconHeader';
// Image
import Deliveryman from './Deliveryman.png';
// Styles
import styles from './footer.module.scss';

const Footer = () => {
  const socials = [
    {
      name: 'instagram',
      link: 'https://www.instagram.com/',
    },
    {
      name: 'facebook',
      link: 'https://www.facebook.com/',
    },
    {
      name: 'twitter',
      link: 'https://twitter.com/?lang=ru',
    },
    {
      name: 'vkontakte',
      link: 'https://vk.com/',
    },
    {
      name: 'telegram',
      link: 'https://web.telegram.org/',
    },
  ];

  return (
    <footer className={styles.main}>
      <Logo className={styles} />
      <div className={styles.content}>
        <p className={styles.desc}>
          {[
            <>
              У нас действует бесплатная доставка по всему городу Москва, и за
              пределы города с учётом доплаты.
            </>,
            <>
              Доставим Вам вкусняшку <strong>с 11:00 до 23:00</strong>.
            </>,
            <>
              {' '}
              Бесплатная доставка осуществляется от <strong>800 руб</strong>.
            </>,
            <>
              Среднее время ожидания до <strong>50 минут</strong>.
            </>,
            <>
              Время заказа может быть увеличено или уменьшено в зависимости от
              нагрузки или погодных условий.
            </>,
            <>
              Для уточнения времени доставки звоните по номеру{' '}
              <a href="tel:8865" aria-label="Номер телефона для заказа">
                «8865»
              </a>
              .
            </>,
          ].map((desc) => (
            <span key={nanoid()}>
              <IconHeader icon="checkbox" />
              {desc}
            </span>
          ))}
        </p>
        <img className={styles.img} src={Deliveryman} alt="Deliveryman" />
        <ul className={styles.socials__list}>
          {socials.map((obj) => (
            <li className={styles.socials__item} key={nanoid()}>
              <a
                className={styles.socials__link}
                href={obj.link}
                target="blank"
                aria-label={obj.name}
              >
                <IconSocials social={obj.name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
