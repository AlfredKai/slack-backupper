const request = require('../util/request');

async function fetchChannelInfo(channelId, token) {
  const data = await request(
    `https://slack.com/api/conversations.info?channel=${channelId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return JSON.parse(data);
}

module.exports = fetchChannelInfo;