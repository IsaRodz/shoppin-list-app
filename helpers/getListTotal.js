export default function listTotal(list) {
  const reducer = (acc, item) => item.price + acc;

  return list.items.reduce(reducer, 0).toFixed(2);
}
