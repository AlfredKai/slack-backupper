const request = require('../util/request');

async function fetchReplies(channelId, token, threadTs) {
  const data = await request(
    `https://slack.com/api/conversations.replies?channel=${channelId}&ts=${threadTs}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return JSON.parse(data);
}

module.exports = fetchReplies;