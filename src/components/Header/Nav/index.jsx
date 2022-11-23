import React from 'react';
// Check Types
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
// ContentLoader
import ContentLoader from 'react-content-loader';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import { checkingUserName } from '../../../auxiliary-functions/ValueСheck';
import {
  animationClose,
  animationCloseCondition,
} from '../../../auxiliary-functions/AnimationClose';
// Components
import BtnNav from '../Button';
import IconNav from '../Header-icon/IconNav';
import IconHeader from '../Header-icon/IconHeader';
import IconClose from '../../Modal/Modal-icon/IconClose';

const Nav = ({ className }) => {
  // React-Context
  const { screenSize, API, category, favorite, basket, userOrder, finalCost } =
    React.useContext(AppContext);
  // React-Context -> Screen Size
  const [screenWidth] = screenSize;
  const widthСomparison1115 = screenWidth <= 1115;
  const widthСomparison420 = screenWidth <= 420;
  // React-State
  const [call, setCall] = React.useState(widthСomparison1115);
  const [tel, setTel] = React.useState(!widthСomparison1115);
  const [btnOpenMenu, setBtnOpenMenu] = React.useState(widthСomparison420);
  const [btnCloseMenu, setBtnCloseMenu] = React.useState(widthСomparison420);
  const [menu, setMenu] = React.useState(!widthСomparison420);
  // React-Ref
  const boxTelRef = React.useRef();
  const contactTelRef = React.useRef();
  const orderTelRef = React.useRef();
  const menuRef = React.useRef();

  React.useMemo(() => {
    widthСomparison1115
      ? widthСomparison420
        ? (setTel(true), setCall(false))
        : (setTel(false), setCall(true))
      : widthСomparison420
      ? (setTel(false), setCall(true))
      : (setTel(true), setCall(false));
    widthСomparison420
      ? (setBtnOpenMenu(true), setBtnCloseMenu(true), setMenu(false))
      : (setBtnOpenMenu(false), setBtnCloseMenu(false), setMenu(true));
  }, [screenWidth]);

  React.useEffect(() => {
    if (
      boxTelRef.current !== undefined &&
      widthСomparison1115 &&
      !widthСomparison420
    )
      document.body.addEventListener('click', (event) => {
        if (
          !event.target.closest('#call') &&
          boxTelRef.current !== null &&
          !boxTelRef.current.contains(event.target)
        ) {
          [contactTelRef.current, orderTelRef.current].forEach((elem) => {
            elem.classList.add(className.tel__link_close);
            setTimeout(() => {
              elem.classList.remove(className.tel__link_close);
              animationClose(
                boxTelRef.current,
                setTel,
                className.tel__box_close
              );
            }, 100);
          });
        }
      });

    if (menuRef.current !== undefined && widthСomparison420)
      document.body.addEventListener('click', (event) =>
        animationCloseCondition(
          event,
          menuRef.current,
          '#menu-open',
          menuRef.current,
          setMenu,
          className.nav__close
        )
      );
  }, [
    widthСomparison1115,
    widthСomparison420,
    menuRef,
    boxTelRef,
    btnOpenMenu,
    menu,
    call,
    tel,
  ]);

  const onClickBtnUserOrder = (value) => {
    userOrder.funActive(value);
    userOrder.funModal(true);
  };

  const onClickBtnToggleMenu = () => {
    menu
      ? animationClose(menuRef.current, setMenu, className.nav__close)
      : setMenu(true);
  };

  return (
    <>
      {btnOpenMenu && (
        <BtnNav
          id="menu-open"
          content={<IconHeader icon="menu" />}
          funNav={() => onClickBtnToggleMenu()}
          ariaLabel={'Открыть меню'}
          className={className.nav__btn_menu__open}
        />
      )}
      {menu && (
        <nav ref={menuRef} className={className.nav}>
          <div className={className.tel__container}>
            {call && (
              <BtnNav
                id="call"
                content={<IconHeader icon="tel" />}
                funNav={() => setTel(true)}
                className={className.call}
                ariaLabel="Позвонить"
              />
            )}
            {tel && (
              <div ref={boxTelRef} className={className.tel__box}>
                {API.loading ? (
                  <ContentLoader
                    speed={1}
                    width={294}
                    height={32}
                    viewBox="0 0 294 32"
                    backgroundColor="#f1a4a4"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="0" rx="5" ry="5" width="197" height="32" />
                    <rect x="212" y="0" rx="5" ry="5" width="82" height="32" />
                  </ContentLoader>
                ) : (
                  [
                    {
                      ref: contactTelRef,
                      name: '+7 (495) 485-85-47',
                      label: 'Контактный номер телефона',
                      tel: '+74954858547',
                    },
                    {
                      ref: orderTelRef,
                      name: '8865',
                      label: 'Номер телефона для заказа',
                      tel: '8865',
                    },
                  ].map((obj, id) => (
                    <a
                      key={`tel-${id + 1}`}
                      ref={obj.ref}
                      className={className.tel__link}
                      href={`tel:${obj.tel}`}
                      aria-label={obj.label}
                    >
                      <IconHeader icon="tel" />
                      {obj.name}
                    </a>
                  ))
                )}
              </div>
            )}
            {API.loading ? (
              <ContentLoader
                speed={1}
                width={165}
                height={32}
                viewBox="0 0 165 32"
                backgroundColor="#f1a4a4"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="5" ry="5" width="165" height="32" />
              </ContentLoader>
            ) : (
              <BtnNav
                id="request-call"
                content={<>Заказать звонок</>}
                funNav={() => onClickBtnUserOrder('order')}
                className={className.tel__btn}
              />
            )}
          </div>
          {API.loading ? (
            <ContentLoader
              speed={1}
              width={183}
              height={22}
              viewBox="0 0 183 22"
              backgroundColor="#f1a4a4"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="4" ry="4" width="22" height="22" />
              <rect x="33" y="3" rx="4" ry="4" width="18" height="17" />
              <rect x="75" y="0" rx="4" ry="4" width="22" height="22" />
              <rect x="107" y="3" rx="4" ry="4" width="18" height="17" />
              <circle cx="161" cy="11" r="11" />
            </ContentLoader>
          ) : (
            <ul className={className.nav__list}>
              {['basket', 'favorite', 'user'].map((btn, id) => (
                <li
                  key={`nav-${id + 1}`}
                  className={className.nav__item}
                  onClick={() =>
                    btn === 'favorite' && category.funCategory('Избранные')
                  }
                >
                  {btn === 'favorite' ? (
                    <Link
                      to={`?product=${encodeURI('Избранные')}`}
                      id={btn}
                      className={`${className.nav__btn} ${
                        className.nav__btn_favorite
                      } ${
                        category.active === 'Избранные'
                          ? className.nav__btn_favorite__active
                          : ''
                      }`}
                      aria-label="Избранные"
                    >
                      <IconNav icon={btn} />
                      <strong>({favorite.length})</strong>
                    </Link>
                  ) : (
                    <BtnNav
                      id={btn}
                      content={
                        <>
                          <IconNav icon={btn} />
                          {btn === 'basket' && (
                            <strong>
                              {basket.length !== 0 ? `${finalCost}руб. ` : null}
                              ({basket.length})
                            </strong>
                          )}
                          {btn === 'user' && checkingUserName() && (
                            <strong>
                              {JSON.parse(localStorage.getItem('user')).name}
                            </strong>
                          )}
                        </>
                      }
                      funNav={() =>
                        btn === 'basket'
                          ? basket.funModal(true)
                          : btn === 'user'
                          ? onClickBtnUserOrder(
                              checkingUserName() ? 'change' : btn
                            )
                          : null
                      }
                      className={`${className.nav__btn} ${
                        btn === 'basket'
                          ? className.nav__btn_basket
                          : className.nav__btn_user
                      }`}
                      ariaLabel={
                        btn === 'basket'
                          ? 'Корзина'
                          : btn === 'user'
                          ? 'Пользователь'
                          : ''
                      }
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
          {btnCloseMenu && (
            <BtnNav
              id="menu-close"
              content={<IconClose icon="circle" />}
              funNav={() => onClickBtnToggleMenu()}
              ariaLabel={'Закрыть меню'}
              className={className.nav__btn_menu__close}
            />
          )}
        </nav>
      )}
    </>
  );
};

Nav.propTypes = {
  className: PropTypes.object,
};

export default Nav;
