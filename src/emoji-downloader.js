const https = require('https');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const delay = require('./util/delay');
const Config = require('./config');
const saveEmojis = require('./save-emoji-list');

const PATH = `${Config.Output}/${Config.Workspace}`;

(async function () {
  await saveEmojis();

  let data = await fsPromises.readFile(`${PATH}/emoji-list.txt`);
  data = JSON.parse(data);
  const emojis = data.emoji;
  fs.mkdirSync(`${PATH}/emojis`);
  for (const key in emojis) {
    if (new URL(emojis[key]).protocol === 'alias:') continue;
    const file = fs.createWriteStream(`${PATH}/emojis/${path.basename(emojis[key])}`);
    https.get(emojis[key], function (response) {
      response.pipe(file);
    });
    await delay(500);
  }
})();
