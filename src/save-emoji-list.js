const fs = require('fs');
const fsPromises = fs.promises;
const fetchEmojiList = require('./api/slack-emoji-list');
const Config = require('./config');

const PATH = `${Config.Output}/${Config.Workspace}/emoji-list.txt`;

async function saveEmojiList() {
  try {
    const data = await fetchEmojiList(Config.Token);
    await fsPromises.writeFile(PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('saveEmojiList', e);
  }
}

module.exports = saveEmojiList;
