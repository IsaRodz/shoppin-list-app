export default function formatDate(date) {
  const m = months[date.getMonth() + 1];
  const d = date.getDate();
  const y = date.getFullYear();

  return `${m}, ${d} ${y}`;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
