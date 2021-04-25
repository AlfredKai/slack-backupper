const request = require('../util/request');

async function fetchHistory(channelId, token) {
  const data = await request(
    `https://slack.com/api/conversations.history?channel=${channelId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

module.exports = fetchHistory;