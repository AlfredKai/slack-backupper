function epoch2date(timestamp) {
  let ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
  return new Date(ts * 1000);
}

module.exports = epoch2date;
