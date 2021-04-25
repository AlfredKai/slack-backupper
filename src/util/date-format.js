const dateAndTime = require('date-and-time');

function dateFormat(date, format) {
  return dateAndTime.format(date, format);
}

module.exports = dateFormat;
