const request = require('../util/request');

async function fetchUserList(token) {
  return await request(`https://slack.com/api/users.list`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

module.exports = fetchUserList;
