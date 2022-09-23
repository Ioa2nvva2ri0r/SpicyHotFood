import React from 'react';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import { animationCloseCondition } from '../../../auxiliary-functions/AnimationClose';
// SimpleBar
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
// Components
import Card from './Card/Card';
import Message from './Message/Message';
import BtnOrder from './Button/BtnOrder/BtnOrder';
import BtnClose from '../Modal-Basket/Button/BtnClose/BtnClose';
// Styles
import styles from './modal-Basket.module.scss';

const ModalBasket = () => {
  // React-Context
  const { screenSize, basket } = React.useContext(AppContext);
  // React-State
  const [heightSimpleBar, setHeightSimpleBar] = React.useState(0);
  // React-Ref
  const modalRef = React.useRef();
  const modalContainerRef = React.useRef();
  const titleBoxRef = React.useRef();
  const orderBoxRef = React.useRef();

  React.useEffect(() => {
    if (modalContainerRef.current !== undefined)
      document.body.addEventListener('click', (event) => {
        if (!event.target.closest('.card__btn-close'))
          animationCloseCondition(
            event,
            modalContainerRef.current,
            '#basket',
            modalRef.current,
            basket.funModal,
            styles.main__close
          );
      });

    if (
      modalContainerRef.current !== undefined &&
      titleBoxRef.current !== undefined &&
      orderBoxRef.current !== undefined
    ) {
      setHeightSimpleBar(
        modalContainerRef.current.offsetHeight -
          parseInt(
            getComputedStyle(modalContainerRef.current, true).paddingTop
          ) -
          parseInt(
            getComputedStyle(modalContainerRef.current, true).paddingBottom
          ) -
          titleBoxRef.current.clientHeight -
          orderBoxRef.current.clientHeight
      );
    }
  }, [screenSize, modalContainerRef, titleBoxRef, orderBoxRef]);

  return (
    <div ref={modalRef} className={styles.main}>
      <div ref={modalContainerRef} className={styles.content__container}>
        <div className={styles.content}>
          <div ref={titleBoxRef} className={styles.title__box}>
            <h2 className={styles.title}>Корзина</h2>
            <BtnClose elemDOM={modalRef} className={styles} />
          </div>
          {basket.length > 0 ? (
            <SimpleBar style={{ height: `${heightSimpleBar}px` }}>
              <ul className={styles.list}>
                {basket.data.map((item, id) => (
                  <li key={`basket-card-${id + 1}`} className={styles.item}>
                    <Card {...item} />
                  </li>
                ))}
              </ul>
            </SimpleBar>
          ) : (
            <Message elemDOM={modalRef} className={styles} />
          )}
        </div>
        {basket.length > 0 && (
          <BtnOrder
            modalElemDOM={modalRef}
            orderElemDOM={orderBoxRef}
            className={styles}
          />
        )}
      </div>
    </div>
  );
};

export default ModalBasket;
