import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
// Context
import { AppContext } from '../../App';
// Auxiliary Functions
import { transformationArray } from '../../auxiliary-functions/TransformationArray';
// Components
import Title from './Title/Title';
import Search from './Search/Search';
import Card from './Card/Card';
import Pages from './Pages/Pages';
// Styles
import styles from './catalog.module.scss';
import Message from './Message/Message';

const Catalog = ({ data }) => {
  const initPage = Number(
    location.hash !== null && location.hash !== '' ? location.hash.slice(1) : 1
  );
  // React-Context
  const { screenSize, category, basket, favorite } =
    React.useContext(AppContext);
  // React-State
  const [page, setPage] = React.useState(initPage);
  const [searchValue, setSearchValue] = React.useState('');

  // Screen Size
  const [screenWidth] = screenSize;
  const cardLimit =
    screenWidth >= 1324
      ? 12
      : screenWidth >= 1010
      ? 9
      : screenWidth >= 625
      ? 6
      : 3;

  // React-State -> Pages
  const [arrayPages, setArrayPages] = React.useState([]);
  React.useEffect(() => {
    let allPages = [];
    for (let num = 1; num <= Math.ceil(data.length / cardLimit); num++)
      allPages.push(num);

    setArrayPages(allPages);
    setPage(initPage);
    setSearchValue('');
  }, [screenWidth, data]);

  // React-State -> Limit
  const [arrayLimit, setArrayLimit] = React.useState([]);
  React.useEffect(() => {
    for (let num = 1; num <= cardLimit; num++) {
      setArrayLimit((prev) => Array.from(new Set([...prev, num])));
    }
  }, [cardLimit]);

  const newArray = transformationArray(
    data,
    basket.data,
    favorite.data,
    searchValue,
    cardLimit,
    page
  );

  return (
    <section className={styles.main}>
      {data.length !== 0 ? (
        <div className={styles.title__box}>
          <Title
            title={searchValue ? 'Поиск по значению:' : 'Раздел:'}
            desc={searchValue ? searchValue : category.active.name}
            className={styles}
          />
          <Search
            value={searchValue}
            funChangeValue={setSearchValue}
            className={styles}
          />
        </div>
      ) : null}
      <ul className={styles.list}>
        {data.length !== 0
          ? newArray.map((item) => (
              <li className={styles.item} key={nanoid()}>
                <Card {...item} activeCard={searchValue} />
              </li>
            ))
          : category.active.name !== 'Избранные' &&
            arrayLimit.map(() => (
              <li className={styles.item} key={nanoid()}>
                <Card />
              </li>
            ))}
      </ul>
      {data.length === 0 && category.active.name === 'Избранные' && (
        <Message content="Увы но тут пусто..." className={styles.message} />
      )}
      {searchValue !== '' && newArray.length === 0 && (
        <Message
          content="Увы! Но такого у нас нет..."
          className={styles.message}
        />
      )}
      {searchValue === '' && arrayPages.length > 1 && (
        <Pages
          pages={arrayPages}
          activePage={page}
          funSwitchPage={(indexPage) => setPage(indexPage)}
        />
      )}
    </section>
  );
};

Catalog.propTypes = {
  data: PropTypes.array,
};

export default Catalog;
