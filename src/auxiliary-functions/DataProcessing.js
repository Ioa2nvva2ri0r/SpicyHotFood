import axios from 'axios';

export function dataAPI(options, allFunction) {
  allFunction.funLoading(true);
  return axios({
    method: options.method,
    url: `https://62d56dba15ad24cbf2c6e691.mockapi.io/${options.path}/${
      options.id ? options.id : ''
    }`,
    data: options.data ? options.data : null,
  })
    .then((res) => {
      if (res.status >= 200 || res.status <= 299) {
        if (options.method === 'GET' && options.path === 'food') {
          allFunction.funGetCategories(res.data.map((obj) => obj.category));
          options.category !== 'Избранные' &&
            allFunction.funGetData(
              res.data.length !== 0 && res.data[0].data !== undefined
                ? res.data.filter(
                    (obj) => obj.category.name === options.category
                  )[0].data
                : res.data
            );
        } else if (options.method === 'GET') {
          allFunction.funGetData(res.data);
        }

        if (options.method === 'POST' && options.path === 'order') {
          allFunction.funGetMessage(
            `"${res.data.name}" благодарим за оставленную заявку, в ближайшее время мы свяжемся с Вами!`
          );
          res.data.order !== undefined && localStorage.removeItem('basket');
        }

        if (options.method !== 'GET' && options.path === 'user') {
          if (options.process === 'create' || options.process === 'change')
            localStorage.setItem('user', JSON.stringify(res.data));
          if (options.process === 'delete') localStorage.removeItem('user');

          allFunction.funGetMessage(
            options.process === 'create'
              ? `Поздравляем, пользователь "${res.data.name}" успешно создан!`
              : options.process === 'change'
              ? `Пользователь "${res.data.name}" успешно изменен!`
              : options.process === 'delete'
              ? `Пользователь "${res.data.name}" успешно удален!`
              : ''
          );

          dataAPI(
            { path: options.path, method: 'GET' },
            {
              funGetData: allFunction.funGetData,
              funLoading: allFunction.funLoading,
            }
          );
        }
      }
    })
    .finally(() => {
      allFunction.funLoading(false);
    });
}

export function dataLocalStorage(options, funGetData, getMessage) {
  const setAndGetItemData = (method, key, data, name) => {
    return (
      localStorage.setItem(key, JSON.stringify(data)),
      funGetData(JSON.parse(localStorage.getItem(key))),
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
      return funGetData(arrayData);
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
