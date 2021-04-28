const https = require('https');
const fs = require('fs');
const path = require('path');
const delay = require('./util/delay');
const Config = require('./config');

const PATH = `${Config.Output}/${Config.Workspace}`;

function filter(url) {
  if (url && url.includes('avatars.slack-edge.com')) {
    const file = fs.createWriteStream(`${PATH}/user-images/${path.basename(url)}`);
    https.get(url, function (response) {
      response.pipe(file);
    });
  }
}

(async function () {
  let data = fs.readFileSync(`${PATH}/user-list.txt`);
  data = JSON.parse(data);
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
