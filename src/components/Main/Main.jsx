import React from 'react';
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../App';
// Components
import Slider from '../Slider/Slider';
import Catalog from '../Catalog/Catalog';

const Main = ({ path }) => {
  // React-Context
  const { API, favorite } = React.useContext(AppContext);

  return (
    <main>
      {path !== '/favorite' ? (
        <>
          <Slider />
          <Catalog data={API.data} />
        </>
      ) : (
        <Catalog data={favorite.data} />
      )}
    </main>
  );
};

Main.propTypes = {
  path: PropTypes.string,
};

export default Main;
