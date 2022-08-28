export function checkingUserName() {
  const user = localStorage.getItem('user');
  return user !== null && Object.keys(JSON.parse(user)).length !== 0;
}

export function checkingPathNameURL(path) {
  return [
    { name: 'Популярные', path: '?p=/popular' },
    { name: 'Пицца', path: '?p=/pizza' },
    { name: 'Суши', path: '?p=/sushi' },
    { name: 'Буррито', path: '?p=/burrito' },
    { name: 'Тако', path: '?p=/taco' },
    { name: 'Десерты', path: '?p=/desserts' },
    { name: 'Избранные', path: '?p=/favorite' },
  ].filter((el) => path.includes(el.path) && el)[0];
}
