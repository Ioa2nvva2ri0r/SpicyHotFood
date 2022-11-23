import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import { smoothScroll } from '../../../auxiliary-functions/SmoothScroll';
// Styles
import styles from './pages.module.scss';

const Pages = ({ pages, activePage, funSwitchPage }) => {
  // React-Context
  const { category } = React.useContext(AppContext);

  const onClickBtnPage = (value) => {
    funSwitchPage(value);
    smoothScroll('#category', 100);
  };

  return (
    <ul className={styles.pages__list}>
      {pages.map((page) => (
        <li
          className={styles.pages__item}
          key={`page-${page}`}
          onClick={() => onClickBtnPage(page)}
        >
          <Link
            to={`?product=${encodeURI(category.active)}#${page}`}
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
