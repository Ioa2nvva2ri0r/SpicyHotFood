import React from 'react';
import PropTypes from 'prop-types';
// Input Mask
import Inputmask from 'inputmask';
// Context
import { AppContext } from '../../../../App';
// Auxiliary Functions
import { changeValueInput } from '../../../../auxiliary-functions/ChangeValue';
import { checkingUserName } from '../../../../auxiliary-functions/ValueСheck';

const Inputs = ({ activeErr, className }) => {
  // React-Context
  const { userOrder } = React.useContext(AppContext);

  const user = JSON.parse(localStorage.getItem('user'));
  const [orderName, setOrderName] = React.useState(
    userOrder.active === 'order' && checkingUserName() ? user.name : ''
  );
  const [orderTel, setOrderTel] = React.useState(
    userOrder.active === 'order' && checkingUserName() ? user.tel : ''
  );
  const [userLogin, setUserLogin] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [createName, setCreateName] = React.useState(
    userOrder.active === 'change' && checkingUserName() ? user.name : ''
  );
  const [createTel, setCreateTel] = React.useState(
    userOrder.active === 'change' && checkingUserName() ? user.tel : ''
  );
  const [createEmail, setCreateEmail] = React.useState(
    userOrder.active === 'change' && checkingUserName() ? user.email : ''
  );
  const [createLogin, setCreateLogin] = React.useState(
    userOrder.active === 'change' && checkingUserName() ? user.login : ''
  );
  const [createPassword, setCreatePassword] = React.useState(
    userOrder.active === 'change' && checkingUserName() ? user.password : ''
  );
  const orderTelRef = React.useRef();
  const createTelRef = React.useRef();
  const changeTelRef = React.useRef();

  const arrayInput =
    userOrder.active === 'order' || userOrder.active === 'user'
      ? [
          {
            name: userOrder.active === 'order' ? 'name' : 'login',
            placeholder: userOrder.active === 'order' ? 'Имя' : 'Логин',
            value: userOrder.active === 'order' ? orderName : userLogin,
            changeValue:
              userOrder.active === 'order' ? setOrderName : setUserLogin,
          },
          {
            name: userOrder.active === 'order' ? 'tel' : 'password',
            placeholder:
              userOrder.active === 'order' ? 'Номер телефона' : 'Пароль',
            ref: userOrder.active === 'order' ? orderTelRef : null,
            value: userOrder.active === 'order' ? orderTel : userPassword,
            changeValue:
              userOrder.active === 'order' ? setOrderTel : setUserPassword,
          },
        ]
      : userOrder.active === 'create' || userOrder.active === 'change'
      ? [
          {
            name: 'name',
            placeholder: 'Имя',
            value: createName,
            changeValue: setCreateName,
          },
          {
            name: 'tel',
            placeholder: 'Номер телефона',
            ref: userOrder.active === 'create' ? createTelRef : changeTelRef,
            value: createTel,
            changeValue: setCreateTel,
          },
          {
            name: 'email',
            placeholder: 'Электронная почта',
            value: createEmail,
            changeValue: setCreateEmail,
          },
          {
            name: 'login',
            placeholder: 'Логин',
            value: createLogin,
            changeValue: setCreateLogin,
          },
          {
            name: 'password',
            placeholder: 'Пароль',
            value: createPassword,
            changeValue: setCreatePassword,
          },
        ]
      : [];

  // Mask Input Tel
  React.useEffect(() => {
    if (orderTelRef.current !== undefined && orderTelRef.current !== null)
      Inputmask({ mask: '+7 (999) 999-99-99' }).mask(orderTelRef.current);

    if (createTelRef.current !== undefined && createTelRef.current !== null)
      Inputmask({ mask: '+7 (999) 999-99-99' }).mask(createTelRef.current);

    if (changeTelRef.current !== undefined && changeTelRef.current !== null)
      Inputmask({ mask: '+7 (999) 999-99-99' }).mask(changeTelRef.current);
  }, [userOrder.active]);

  return (
    <div className={className.input__container}>
      {arrayInput.map((obj, index) => (
        <div className={className.input__box} key={`${obj.name}-${index + 1}`}>
          <input
            ref={obj.ref ? obj.ref : null}
            className={`${className.input} ${
              activeErr === obj.placeholder ? className.input__err : ''
            }`}
            name={obj.name}
            placeholder={obj.placeholder}
            value={obj.value}
            type={obj.name === 'password' ? 'password' : 'text'}
            autoComplete="off"
            onChange={(event) =>
              changeValueInput(event, obj.changeValue, '#f1d5af')
            }
          />
          {obj.name !== 'email' && (
            <span className={className.input__star}>*</span>
          )}
        </div>
      ))}
      <p className={className.desc__star}>
        Поля отмеченные звёздочкой <strong>*</strong> обязательны для
        заполнения.
      </p>
    </div>
  );
};

Inputs.propTypes = {
  activeErr: PropTypes.string,
  className: PropTypes.object,
};

export default Inputs;
