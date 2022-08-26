import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
// Auxiliary Functions
import { smoothScroll } from '../../../auxiliary-functions/SmoothScroll';
// Styles
import styles from './pages.module.scss';

const Pages = ({ pages, activePage, funSwitchPage }) => {
  const onClickBtnPage = (value) => {
    funSwitchPage(value);
    smoothScroll('#category', 100);
  };

  return (
    <ul className={styles.pages__list}>
      {pages.map((page) => (
        <li
          className={styles.pages__item}
          key={nanoid()}
          onClick={() => onClickBtnPage(page)}
        >
          <Link
            to={`${location.pathname}?page=${page}`}
            className={`${styles.pages__link} ${
              activePage === page ? styles.pages__link_active : ''
            }`}
          >
            {page}
          </Link>
        </li>
      ))}
    </ul>
  );
};

Pages.propTypes = {
  pages: PropTypes.array,
  activePage: PropTypes.number,
  funSwitchPage: PropTypes.func,
};

export default Pages;