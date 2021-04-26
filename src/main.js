const fetchHisotry = require('./api/slack-conversations-history');
const epoch2date = require('./util/epoch-to-date');
const dateFormat = require('./util/date-format')
const Config = require('./config')

fetchHisotry(
  Config.ChannelId,
  Config.Token
).then((d) => {
  const msg = JSON.parse(d).messages[0];
  console.log(msg);
  console.log(dateFormat(epoch2date(msg.ts), 'YYYY-MM-DD HH-mm-ss'))
});
