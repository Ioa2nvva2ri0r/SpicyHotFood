/* eslint-disable no-undef */
import axios from 'axios';
const env = process.env;

export function dataAPI(
  { id, path, method, data, category, process },
  { loading, getData, getCategories, getMessage }
) {
  loading(true);

  return axios({
    method: method,
    url: `${env.REACT_APP_API_URL}/${path}/${
      id ? id : `?category=${env.REACT_APP_PRODUCT}`
    }`,
    data: data ? data : null,
  })
    .then((res) => {
      if (res.status >= 200 || res.status <= 299) {
        if (method === 'GET' && path === 'product') {
          const data = res.data[0].data;

          getCategories &&
            getCategories([...new Set(data.map((obj) => obj.category))]);
          getData && getData(data.filter((obj) => obj.category === category));
        } else if (method === 'GET') {
          getData(res.data);
        }

        if (method === 'POST' && path === 'order') {
          getMessage(
            `"${res.data.name}" благодарим за оставленную заявку, в ближайшее время мы свяжемся с Вами!`
          );
          res.data.order !== undefined && localStorage.removeItem('basket');
        }

        if (method !== 'GET' && path === 'user') {
          if (process === 'create' || process === 'change')
            localStorage.setItem('user', JSON.stringify(res.data));
          if (process === 'delete') localStorage.removeItem('user');

          getMessage(
            process === 'create'
              ? `Поздравляем, пользователь "${res.data.name}" успешно создан!`
              : process === 'change'
              ? `Пользователь "${res.data.name}" успешно изменен!`
              : process === 'delete'
              ? `Пользователь "${res.data.name}" успешно удален!`
              : ''
          );

          dataAPI(
            { path: path, method: 'GET' },
            {
              getData: getData,
              loading: loading,
            }
          );
        }
      }
    })
    .finally(() => loading(false));
}

export function dataLocalStorage(options, getData, getMessage) {
  const setAndGetItemData = (method, key, data, name) => {
    return (
      localStorage.setItem(key, JSON.stringify(data)),
      getData(JSON.parse(localStorage.getItem(key))),
      getMessage(
        `"${name}" ${
          method === 'DELETE'
            ? `удален(а) из ${key === 'basket' ? 'корзины' : 'избранных'}`
            : method === 'POST'
            ? `добавлен(а) в ${key === 'basket' ? 'корзину' : 'избранные'}`
            : 'изменен(а)'
        }`
      )
    );
  };

  // Checking for the presence of data by key
  if (localStorage.getItem(options.key) === null)
    localStorage.setItem(options.key, JSON.stringify([]));

  let arrayData = JSON.parse(localStorage.getItem(options.key));
  const indexObj =
    arrayData.length !== 0 && options.data !== undefined
      ? arrayData.findIndex((obj) => obj.id === options.data.id)
      : 0;

  switch (options.method) {
    case 'GET':
      return getData(arrayData);
    case 'POST':
      return setAndGetItemData(
        options.method,
        options.key,
        [...arrayData, options.data],
        options.data.name
      );
    case 'PUT': {
      if (indexObj !== -1) {
        arrayData.splice(
          indexObj,
          1,
          Object.fromEntries(
            Object.entries(arrayData[indexObj]).map(([key, value]) =>
              options.data[key] && key !== 'id' && key !== 'name'
                ? [key, options.data[key]]
                : [key, value]
            )
          )
        );
      }
      return setAndGetItemData(
        options.method,
        options.key,
        arrayData,
        arrayData[indexObj].name
      );
    }
    case 'DELETE': {
      const nameRemoveProd = arrayData[indexObj].name;
      if (indexObj !== -1) arrayData.splice(indexObj, 1);

      return setAndGetItemData(
        options.method,
        options.key,
        arrayData,
        nameRemoveProd
      );
    }
  }
}
