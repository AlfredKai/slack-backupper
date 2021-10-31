const request = require('../util/request');

async function fetchReplies(channelId, token, threadTs) {
  return await request(`https://slack.com/api/conversations.replies?channel=${channelId}&ts=${threadTs}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

module.exports = fetchReplies;
