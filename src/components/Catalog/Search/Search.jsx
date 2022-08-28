import React from 'react';
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import { changeValueInput } from '../../../auxiliary-functions/ChangeValue';
// Components
import IconSearch from '../Catalog-icon/IconSearch';

const Search = ({ value, funChangeValue, className }) => {
  // React-Context
  const { loading } = React.useContext(AppContext);

  return loading ? null : (
    <div className={className.input__box}>
      <input
        id="search"
        name="search"
        className={className.input}
        placeholder="Поиск по разделу..."
        type="text"
        autoComplete="off"
        maxLength={30}
        value={value}
        onChange={(event) =>
          changeValueInput(event, funChangeValue, '#d3d3d3', 'lower')
        }
      />
      <label className={className.input__label} htmlFor="search">
        <IconSearch />
      </label>
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  funChangeValue: PropTypes.func,
  className: PropTypes.object,
};

export default Search;
