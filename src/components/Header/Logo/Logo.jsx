import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../App';

const Logo = ({ className }) => {
  // React-Context
  const { category } = React.useContext(AppContext);

  const upsmoothScroll = () => {
    category.funCategory({
      name: 'Популярные',
      path: 'popular',
    });
    return window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <h1 className={className.logo} onClick={upsmoothScroll}>
      <Link to="popular" className={className.logo__link}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <circle cx="256" cy="256" r="256" fill="#FF314F" />
          <path
            id="shadow"
            fill="#A30F44"
            d="M319.383,504.086c102.664-26.15,180.534-114.345,191.331-222.306l-89.736-89.736L242.84,322.138
	l-21.245-21.245l-85.821,4.11l76.173,76.173l-13.972,1.5L319.383,504.086z"
          />
          <path
            fill="#FFAD9E"
            d="M197.972,382.676c0-32.047,25.979-58.027,58.027-58.027s58.027,25.979,58.027,58.027H197.972z"
          />
          <path
            fill="#FF6262"
            d="M256,324.648v58.027h58.027C314.027,350.629,288.047,324.649,256,324.648z"
          />
          <path
            fill="#FFFFFF"
            d="M420.978,192.043c0,91.115-73.862,164.978-164.978,164.978S91.022,283.158,91.022,192.043
	L420.978,192.043z"
          />
          <path
            fill="#D0D1D3"
            d="M420.978,192.043H256v164.978C347.115,357.021,420.978,283.158,420.978,192.043z"
          />
        </svg>
        <span>Spicy</span>&<span>Hot</span>FOOD
      </Link>
    </h1>
  );
};

Logo.propTypes = {
  className: PropTypes.object,
};

export default Logo;
