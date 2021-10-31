const request = require('../util/request');

async function fetchChannelInfo(channelId, token) {
  return await request(`https://slack.com/api/conversations.info?channel=${channelId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

module.exports = fetchChannelInfo;
