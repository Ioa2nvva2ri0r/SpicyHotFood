export function checkingUserName() {
  const user = localStorage.getItem('user');
  return user !== null && Object.keys(JSON.parse(user)).length !== 0;
}
