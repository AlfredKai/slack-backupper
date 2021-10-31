const request = require('../util/request');

async function fetchEmojiList(token) {
  return await request(`https://slack.com/api/emoji.list`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

module.exports = fetchEmojiList;
