import React from 'react';
// Components
import Logo from './Logo';
import Menu from './Menu';
import Nav from './Nav';
// Styles
import styles from './header.module.scss';
import IconHeader from './Header-icon/IconHeader';

const Header = () => {
  return (
    <header className={styles.main}>
      <div className={styles.content}>
        <Logo className={styles} />
        <p className={styles.desc}>
          {[
            {
              name: 'checkbox',
              desc: <>Всегда быстро и изумительно вкусно!</>,
            },
            {
              name: 'time',
              desc: (
                <>
                  {' '}
                  Время работы:
                  <span className={styles.desc__time}>c 11.00 до 23.00.</span>
                </>
              ),
            },
            { name: 'calendar', desc: <>Без обеда и выходных!</> },
          ].map((obj, id) => (
            <span key={`icon-header-${id + 1}`} className={styles.desc__box}>
              <IconHeader icon={obj.name} />
              {obj.desc}
            </span>
          ))}
        </p>
      </div>
      <div className={styles.nav__container}>
        <Menu className={styles} />
        <Nav className={styles} />
      </div>
    </header>
  );
};

export default Header;
