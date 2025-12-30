export const formatDateTime = (date: Date) => {
  const datePart = date
    .toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    .replace(/,/g, '');

  const timePart = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return `${datePart} ${timePart}`;
};
