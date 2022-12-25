const DisplayDate = () => {
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

  const now = new Date();

  const day = now.getUTCDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const today = `${day} ${months[month]} ${year}`;

  return <h1 className='date'>Your budget in {today}</h1>;
};

export default DisplayDate;
