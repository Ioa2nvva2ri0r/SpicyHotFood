export function costPerSize(size, price) {
  return size === 'littel'
    ? Math.round(price - price * 0.5)
    : size === 'big'
    ? Math.round(price + price * 0.5)
    : price;
}

export function calculationCost(
  category,
  amount,
  size,
  price,
  finalCost = false
) {
  return category === 'Суши'
    ? amount === 6
      ? price
      : price + Math.round(price * ((amount - 6) / 10))
    : finalCost
    ? amount * costPerSize(size, price)
    : costPerSize(size, price);
}
