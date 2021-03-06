import {parse, format} from 'date-fns';

export function formatDate(startDate, endDate) {
  // If specific date is not defined yet. Meaning startDate is 2018-02 for instance
  if (startDate.length === 7) { return format(parse(`${startDate}-01`), 'MMMM'); }

  const parsedStartDate = parse(startDate);
  let date = format(parsedStartDate, 'MMM, Do');

  if (endDate && startDate !== endDate) {
    date += format(parse(endDate), '-Do');
  }

  return date;
}

export function generateEventJSONLD({name, url, city, country, startDate, endDate}) {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'Event',
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressCountry: country,
      },
      name: `${city}, ${country}`,
    },
    name,
    startDate,
    url,
    endDate: (endDate || startDate),
  };

  return JSON.stringify(data);
}
