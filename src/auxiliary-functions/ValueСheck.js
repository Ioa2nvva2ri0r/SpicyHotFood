export function checkingUserName() {
  const user = localStorage.getItem('user');
  return user !== null && Object.keys(JSON.parse(user)).length !== 0;
}

export function checkingPathNameURL(path) {
  return [
    { name: 'Популярные', path: 'popular' },
    { name: 'Пицца', path: 'pizza' },
    { name: 'Суши', path: 'sushi' },
    { name: 'Буррито', path: 'burrito' },
    { name: 'Тако', path: 'taco' },
    { name: 'Десерты', path: 'desserts' },
    { name: 'Избранные', path: 'favorite' },
  ].filter((el) => path.includes(el.path) && el)[0];
}
