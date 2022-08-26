function searchIndexArray(array, obj) {
  return array.findIndex((objBasket) => objBasket.id === obj.id);
}

function changeObject(obj, array, index) {
  return Object.fromEntries(
    Object.entries(obj).map(([key]) => [key, array[index][key]])
  );
}

export const transformationArray = (
  arrayMain,
  arrayBasket,
  arrayFavorite,
  value,
  limit,
  page
) => {
  let newArray = [...arrayMain].map((obj) => {
    const indexBasket = searchIndexArray(arrayBasket, obj);
    const indexFavorite = searchIndexArray(arrayFavorite, obj);

    if (indexBasket !== -1 && indexFavorite !== -1) {
      return Object.fromEntries(
        Object.entries(obj).map(([key]) =>
          key === 'favorite' && indexFavorite !== -1
            ? [key, arrayFavorite[indexFavorite][key]]
            : [key, arrayBasket[indexBasket][key]]
        )
      );
    } else if (indexBasket !== -1) {
      return changeObject(obj, arrayBasket, indexBasket);
    } else if (indexFavorite !== -1) {
      return changeObject(obj, arrayFavorite, indexFavorite);
    }

    return obj;
  });
  return value === ''
    ? newArray.slice(page === 1 ? 0 : limit * (page - 1), limit * page)
    : newArray
        .filter((item) => item.name.toLowerCase().includes(value))
        .slice(0, limit);
};
