const fs = require('fs');
const fsPromises = fs.promises;

const Config = require('../config');

const FILE_URL_PATTERN = 'files.slack.com';
const CHANNEL = '';

(async function () {
  try {
    const PATH = `${Config.Output}/${Config.Workspace}/channels/${CHANNEL}`;
    const DIR = `${PATH}/files`;
    let files = await fsPromises.readdir(PATH);
    await fsPromises.mkdir(`${DIR}`, { recursive: true });
    files = files.filter((f) => f.includes('messages'));
    files.sort();
    const sources = [];
    const seen = new Set();
    for (const file of files) {
      let messages = await fsPromises.readFile(`${PATH}/${file}`);
      messages = JSON.parse(messages);
      for (const msg of messages) {
        for (const prop in msg.file) {
          const value = msg.file[prop];
          if (typeof value === 'string' && value.includes(FILE_URL_PATTERN)) {
            if (seen.has(value)) {
              console.log('duplicated url:', value);
              continue;
            }
            console.log(value);
            sources.push(value);
            seen.add(value);
          }
        }
        if (!msg.files) continue;
        for (const file of msg.files) {
          for (const prop in file) {
            const value = file[prop];
            if (typeof value === 'string' && value.includes(FILE_URL_PATTERN)) {
              if (seen.has(value)) {
                console.log('duplicated url:', value);
                continue;
              }
              console.log(value);
              sources.push(value);
              seen.add(value);
            }
          }
        }
      }
    }
    await fsPromises.writeFile(`${DIR}/files`, JSON.stringify(sources, null, 2));
    console.log(`${sources.length} urls saved in: ${DIR}/files`);
  } catch (err) {
    console.error(err);
  }
})();
