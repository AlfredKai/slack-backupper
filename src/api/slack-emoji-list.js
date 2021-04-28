const request = require('../util/request');

async function fetchEmojiList(token) {
  const data = await request(
    `https://slack.com/api/emoji.list`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return JSON.parse(data);
}

module.exports = fetchEmojiList;