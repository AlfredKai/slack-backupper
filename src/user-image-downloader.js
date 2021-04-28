const https = require('https');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const delay = require('./util/delay');
const Config = require('./config');

const DIR = `${Config.Output}/${Config.Workspace}`;

(async function () {
  let data = await fsPromises.readFile(`${DIR}/user-list.txt`);
  data = JSON.parse(data);
  await fsPromises.mkdir(`${DIR}/user-images`, { recursive: true });
  for (const member of data.members) {
    filter(member.profile.image_original);
    await delay(500);
    filter(member.profile.image_24);
    await delay(500);
    filter(member.profile.image_32);
    await delay(500);
    filter(member.profile.image_48);
    await delay(500);
    filter(member.profile.image_72);
    await delay(500);
    filter(member.profile.image_192);
    await delay(500);
    filter(member.profile.image_512);
    await delay(500);
    filter(member.profile.image_1024);
    await delay(500);
  }
})();

function filter(url) {
  if (url && url.includes('avatars.slack-edge.com')) {
    const file = fs.createWriteStream(`${DIR}/user-images/${path.basename(url)}`);
    https.get(url, function (response) {
      response.pipe(file);
    });
  }
}