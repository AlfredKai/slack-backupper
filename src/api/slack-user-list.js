const request = require('../util/request');

async function fetchUserList(token) {
  const data = await request(
    `https://slack.com/api/users.list`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return JSON.parse(data);
}

module.exports = fetchUserList;