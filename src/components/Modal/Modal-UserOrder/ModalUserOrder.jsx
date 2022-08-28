import React from 'react';
import PropTypes from 'prop-types';
// Context
import { AppContext } from '../../../App';
// Auxiliary Functions
import { validationForm } from '../../../auxiliary-functions/Validation';
import { animationCloseCondition } from '../../../auxiliary-functions/AnimationClose';
// Components
import Desc from './Desc/Desc';
import Inputs from './Inputs/Inputs';
import BtnSubmit from './Button/BtnSubmit/BtnSubmit';
import BtnCreate from './Button/BtnCreate/BtnCreate';
import BtnExitDelete from './Button/BtnExitDelete/BtnExitDelete';
import BtnClose from './Button/BtnClose/BtnClose';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Preloader from '../../Catalog/Card/Preloader/Preloader';
import AffirmativeMessage from './AffirmativeMessage/AffirmativeMessage';
// Styles
import styles from './modal-UserOrder.module.scss';

const ModalUserTel = ({
  dataUsers,
  message,
  loading,
  funСhangingData,
  funMessage,
  funLoading,
}) => {
  // React-Context
  const { order, userOrder, discount } = React.useContext(AppContext);

  const [errMessage, setMessage] = React.useState('');
  const modalRef = React.useRef();
  const formRef = React.useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {};

    const valueСonversion = (name, value) =>
      name === 'tel' ? value.replace(/[^0-9]/g, '') : value;

    try {
      for (let elem of e.currentTarget.elements) {
        if (elem.nodeName === 'INPUT') {
          validationForm(elem, valueСonversion(elem.name, elem.value));
          data[elem.name] = valueСonversion(elem.name, elem.value);
        }
      }

      if (userOrder.active === 'user' || userOrder.active === 'create') {
        dataUsers.map((obj) => {
          const index = (property) =>
            dataUsers.findIndex((user) => user.login === data[property]);

          if (userOrder.active === 'user')
            if (index('login') !== -1) {
              if (dataUsers[index('login')].password === data.password) {
                localStorage.setItem('user', JSON.stringify(obj));
                funMessage(
                  `Поздравляем "${obj.name}", вы успешно зашли в систему!`
                );
              } else throw new Error('Неверный «Пароль»!');
            } else
              throw new Error('Пользователя с таким «Логином» не существует!');
          else {
            if (index('tel') !== -1)
              throw new Error(
                'Пользователь с таким «Номером телефона» уже существует!'
              );
            if (index('login') !== -1)
              throw new Error('Пользователь с таким «Логином» уже существует!');
          }
          return obj;
        });
      }

      if (userOrder.active === 'order' && order.complete)
        data['order'] = JSON.parse(localStorage.getItem('basket')).map(
          (obj) => {
            delete obj.ingredients;
            delete obj.nutrients;
            delete obj.src;
            delete obj.favorite;
            delete obj.basket;
            return obj;
          }
        );

      data['discount'] = discount;

      funСhangingData({
        path:
          userOrder.active === 'create' || userOrder.active === 'change'
            ? 'user'
            : userOrder.active,
        method:
          userOrder.active === 'order' || userOrder.active === 'create'
            ? 'POST'
            : userOrder.active === 'change'
            ? 'PUT'
            : 'GET',
        id:
          userOrder.active === 'change'
            ? JSON.parse(localStorage.getItem('user')).id
            : undefined,
        data: userOrder.active === 'user' ? null : data,
        process: userOrder.active,
      });

      order.funComplete(false);
    } catch (error) {
      setMessage(error.message);
    }
  };

  React.useMemo(() => {
    if (formRef.current !== undefined)
      document.body.addEventListener('click', (event) => {
        animationCloseCondition(
          event,
          formRef.current,
          `#${userOrder.active === 'order' ? 'request-call' : 'user'}`,
          modalRef.current,
          userOrder.funModal,
          styles.main__close
        );
      });
  }, [formRef.current]);

  return (
    <div ref={modalRef} className={styles.main}>
      <form ref={formRef} className={styles.form} onSubmit={(e) => onSubmit(e)}>
        <Desc className={styles} />
        <Inputs
          activeErr={
            errMessage !== ''
              ? errMessage.match(/«(.*?)»/g)[0].replace(/[^a-zа-яё\s]/gi, '')
              : ''
          }
          className={styles}
        />
        <BtnSubmit className={styles} />
        <BtnCreate funLoading={funLoading} className={styles} />
        <BtnExitDelete
          funDelete={funСhangingData}
          funLoading={funLoading}
          className={styles}
        />
        {errMessage !== '' && (
          <ErrorMessage
            message={errMessage}
            funMessage={setMessage}
            className={styles}
          />
        )}
        {message !== '' && (
          <AffirmativeMessage
            elemDOM={modalRef}
            message={message}
            funMessage={funMessage}
            className={styles}
          />
        )}
        <BtnClose elemDOM={modalRef} className={styles} />
        {loading && <Preloader className={styles.loading} />}
      </form>
    </div>
  );
};

ModalUserTel.propTypes = {
  dataUsers: PropTypes.array,
  message: PropTypes.string,
  loading: PropTypes.bool,
  funСhangingData: PropTypes.func,
  funMessage: PropTypes.func,
  funLoading: PropTypes.func,
};

export default ModalUserTel;
