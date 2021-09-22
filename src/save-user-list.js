const fs = require('fs');
const fsPromises = fs.promises;
const fetchUserList = require('./api/slack-user-list');
const Config = require('./config');

const PATH = `${Config.Output}/${Config.Workspace}/user-list.txt`;

async function saveUserList() {
  try {
    const data = await fetchUserList(Config.Token);
    if (!data.ok) throw Error(data.error);
    await fsPromises.writeFile(PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('saveUserList', e);
  }
}

module.exports = saveUserList;
