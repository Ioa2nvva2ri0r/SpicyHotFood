import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
// ContentLoader
import ContentLoader from 'react-content-loader';
// Slider-Swiper
import { Navigation, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import {
  animationClose,
  animationCloseCondition,
} from '../../../auxiliary-functions/AnimationClose';
import { smoothScroll } from '../../../auxiliary-functions/SmoothScroll';
// Components
import BtnNav from '../Button';
import IconHeader from '../Header-icon/IconHeader';
import IconSlide from '../Header-icon/IconSlide';

const Menu = ({ className }) => {
  // React-Context
  const { screenSize, API, category } = React.useContext(AppContext);
  // React-Context -> Screen Size
  const [screenWidth] = screenSize;
  const widthСomparison = screenWidth <= 1115;
  // React-State
  const [btnMenu, setBtnMenu] = React.useState(widthСomparison);
  const [menu, setMenu] = React.useState(!widthСomparison);
  // React-Ref
  const menuRef = React.useRef();

  React.useMemo(() => {
    widthСomparison
      ? (setMenu(false), setBtnMenu(true))
      : (setMenu(true), setBtnMenu(false));
  }, [screenWidth]);

  React.useEffect(() => {
    if (menuRef.current !== undefined && widthСomparison) {
      document.body.addEventListener('click', (event) =>
        animationCloseCondition(
          event,
          menuRef.current,
          '#menu',
          menuRef.current,
          setMenu,
          className.menu__slider_close
        )
      );
    }
  }, [widthСomparison, menuRef, menu, btnMenu]);

  const onClickBtnMenu = () => {
    setMenu(true);
    menu &&
      animationClose(menuRef.current, setMenu, className.menu__slider_close);
  };

  const onClickBtnCategory = (value) => {
    category.funCategory(value);
    smoothScroll('#category', 100);
    menu &&
      widthСomparison &&
      animationClose(menuRef.current, setMenu, className.menu__slider_close);
  };

  const link = (path) => (
    <Link
      to={`?product=${encodeURI(path)}`}
      className={`${className.menu__link} ${
        category.active === path ? className.menu__link_active : ''
      }`}
    >
      {path}
    </Link>
  );

  return (
    <nav className={className.menu}>
      {btnMenu && (
        <BtnNav
          id="menu"
          content={
            <>
              <IconHeader icon="pizza" />
              Меню
            </>
          }
          className={className.menu__link_open}
          funNav={() => onClickBtnMenu()}
        />
      )}
      {menu &&
        (widthСomparison ? (
          <div ref={menuRef} className={className.menu__slider}>
            <button
              className={`${className.menu__slider_btn} swiper__btn-prev`}
            >
              <IconSlide rotate={true} />
            </button>
            <Swiper
              modules={[Navigation, Autoplay, EffectFade]}
              navigation={{
                prevEl: '.swiper__btn-prev',
                nextEl: '.swiper__btn-next',
              }}
              spaceBetween={0}
              slidesPerView={
                screenWidth <= 400
                  ? 1
                  : screenWidth <= 550
                  ? 2
                  : screenWidth <= 700
                  ? 3
                  : screenWidth <= 900
                  ? 4
                  : screenWidth <= 1115
                  ? 5
                  : 0
              }
              slidesPerGroup={1}
              speed={800}
              style={{ borderRadius: '5px' }}
            >
              {category.array.map((path, id) => (
                <SwiperSlide
                  key={`category-slide-${id + 1}`}
                  className={className.menu__item}
                  onClick={() => onClickBtnCategory(path)}
                  onBlur={() =>
                    path === category.array[category.array.length - 1] &&
                    animationClose(
                      menuRef.current,
                      setMenu,
                      className.menu__slider_close
                    )
                  }
                >
                  {link(path)}
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={`${className.menu__slider_btn} swiper__btn-next`}
            >
              <IconSlide rotate={false} />
            </button>
          </div>
        ) : API.loading ? (
          <ContentLoader
            speed={2}
            width={580}
            height={38}
            viewBox="0 0 580 38"
            backgroundColor="#df9090"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="8" ry="8" width="580" height="38" />
          </ContentLoader>
        ) : (
          <ul className={className.menu__list}>
            {category.array.map((path, id) => (
              <li
                key={`category-${id + 1}`}
                className={className.menu__item}
                onClick={() => onClickBtnCategory(path)}
              >
                {link(path)}
              </li>
            ))}
          </ul>
        ))}
    </nav>
  );
};

Menu.propTypes = {
  className: PropTypes.object,
};

export default Menu;
