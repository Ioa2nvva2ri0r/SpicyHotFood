import validator from 'validator';

export function checkingForSpaces(value, inputName) {
  if (value.includes(' ')) {
    throw new Error(`«${inputName}» содержит пробельные символы!`);
  } else return false;
}

export function checkForEmptyInputField(value, inputName) {
  if (!validator.isLength(value, { min: 1 })) {
    throw new Error(
      `«${inputName}» не указан${inputName === 'Имя' ? 'о' : ''}!`
    );
  } else return false;
}

export function checkForInputLength(value, inputName, min, max) {
  if (!validator.isLength(value, { min: min, max: max })) {
    throw new Error(
      `«${inputName}» не дол${inputName === 'Имя' ? 'жно' : 'жен'} быть менее ${
        min === max ? `и более ${min}` : `${min} и более ${max}`
      } символов!`
    );
  } else return false;
}

export function checkingIfOnlyNumbersMatter(value, inputName) {
  if (/[^0-9]/.test(value)) {
    throw new Error(`«${inputName}» содержит символы не являющиеся цифрами!`);
  } else return false;
}

export function checkingIfOnlyLettersRussiansMatter(value, inputName) {
  if (/[^а-яё]/gi.test(value)) {
    throw new Error(
      `«${inputName}» содержит символы не являющиеся буквами русского алфавита!`
    );
  } else return false;
}

export function checkingIfOnlyLetterslatinsMatter(value, inputName) {
  if (/[^0-9a-z_-]/gi.test(value)) {
    throw new Error(
      `«${inputName}» может содержать в себе только латиницу, цифры, тире и нижнее подчёркивание!`
    );
  } else return false;
}

export function validationForm(input, value) {
  checkingForSpaces(value, input.placeholder);

  if (input.name !== 'email') {
    checkForEmptyInputField(value, input.placeholder);
  }
  if (input.name === 'name') {
    checkForInputLength(value, input.placeholder, 2, 15);
    checkingIfOnlyLettersRussiansMatter(value, input.placeholder);
  }
  if (input.name === 'tel') {
    checkingIfOnlyNumbersMatter(value, input.placeholder);
    checkForInputLength(value, input.placeholder, 11, 11);
  }
  if (input.name === 'login' || input.name === 'password') {
    if (!validator.isLength(value, { min: 6 })) {
      throw new Error(
        `«${input.placeholder}» не указан, или его значение менее 6 символов!`
      );
    }
    checkingIfOnlyLetterslatinsMatter(value, input.placeholder);
  }
  if (input.name === 'email' && value !== '') {
    if (!validator.isEmail(value)) {
      throw new Error(
        `«${input.placeholder}» указана не правильно, или имеет некорректную формулировку!`
      );
    }
  }
}
