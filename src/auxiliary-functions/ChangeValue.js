export function changeValueInput(event, funChangeValue, color, register) {
  const input = event.currentTarget;
  let value = input.value;
  const changeBorder = (color) =>
    (event.currentTarget.style.borderColor = color);

  value !== '' ? changeBorder('#89f09c') : changeBorder(color);

  if (input.name === 'name') {
    value = value.toLowerCase();
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }

  funChangeValue(register === 'lower' ? value.toLowerCase() : value);
}

export function quantityChangeProduct(
  { type, variable },
  value,
  symbol,
  step,
  min,
  max
) {
  return symbol === '+' && value <= max
    ? type === 'var'
      ? variable + step
      : type === 'fun'
      ? variable((prev) => prev + step)
      : null
    : symbol === '-' && value >= min
    ? type === 'var'
      ? variable - step
      : type === 'fun'
      ? variable((prev) => prev - step)
      : null
    : value;
}
