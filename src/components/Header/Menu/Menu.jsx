import React from 'react';
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
// Slider-Swiper
import { Navigation, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import {
  animationClose,
  animationCloseCondition,
} from '../../../auxiliary-functions/AnimationClose';
import { smoothScroll } from '../../../auxiliary-functions/SmoothScroll';
// Components
import BtnNav from '../Button/BtnNav';
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

  const link = (path, name) => (
    <Link
      to={path}
      className={`${className.menu__link} ${
        category.active.name === name ? className.menu__link_active : ''
      }`}
    >
      {name}
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
              {category.array.map((item) => (
                <SwiperSlide
                  key={nanoid()}
                  className={className.menu__item}
                  onClick={() => onClickBtnCategory(item)}
                  onBlur={() =>
                    item === category.array[category.array.length - 1] &&
                    animationClose(
                      menuRef.current,
                      setMenu,
                      className.menu__slider_close
                    )
                  }
                >
                  {link(item.path, item.name)}
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
            backgroundColor="#f8f0e7"
            foregroundColor="#fff"
          >
            <rect x="0" y="0" rx="8" ry="8" width="580" height="38" />
          </ContentLoader>
        ) : (
          <ul className={className.menu__list}>
            {category.array.map((item) => (
              <li
                key={nanoid()}
                className={className.menu__item}
                onClick={() => onClickBtnCategory(item)}
              >
                {link(item.path, item.name)}
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
