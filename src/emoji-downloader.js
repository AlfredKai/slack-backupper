const https = require('https');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const delay = require('./util/delay');
const Config = require('./config');
const saveEmojis = require('./save-emoji-list');

const DIR = `${Config.Output}/${Config.Workspace}/emojis`;

(async function () {
  await saveEmojis();

  let data = await fsPromises.readFile(`${DIR}/emoji-list.txt`);
  data = JSON.parse(data);
  const emojis = data.emoji;
  await fsPromises.mkdir(`${DIR}/emojis`, { recursive: true });
  for (const key in emojis) {
    if (new URL(emojis[key]).protocol === 'alias:') continue;
    const file = fs.createWriteStream(`${DIR}/emojis/${path.basename(emojis[key])}`);
    https.get(emojis[key], function (response) {
      response.pipe(file);
    });
    await delay(500);
  }
})();
