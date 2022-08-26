export function checkingUserName() {
  const user = localStorage.getItem('user');
  return user !== null && Object.keys(JSON.parse(user)).length !== 0;
}

export function checkingPathNameURL(path) {
  return path === '/'
    ? 'Популярные'
    : path === '/pizza'
    ? 'Пицца'
    : path === '/sushi'
    ? 'Суши'
    : path === '/burrito'
    ? 'Буррито'
    : path === '/taco'
    ? 'Тако'
    : path === '/desserts'
    ? 'Десерты'
    : path === '/favorite'
    ? 'Избранные'
    : '';
}
