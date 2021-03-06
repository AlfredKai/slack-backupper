const request = require('../util/request');

async function fetchHistory(channelId, token, cursor, inclusive, latest) {
  const cursorQuery = cursor ? `&cursor=${cursor}` : '';
  const inclusiveQuery = inclusive ? `&inclusive=${inclusive}` : '';
  const latestQuery = latest ? `&latest=${latest}` : '';
  return await request(
    `https://slack.com/api/conversations.history?channel=${channelId}${cursorQuery}${inclusiveQuery}${latestQuery}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

module.exports = fetchHistory;
