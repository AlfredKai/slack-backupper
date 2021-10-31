const fetchHistory = require('./api/slack-conversations-history');
const fetchReplies = require('./api/slack-conversations-replies');
const fetchChannelInfo = require('./api/slack-conversation-info');
const epoch2date = require('./util/epoch-to-date');
const dateFormat = require('./util/date-format');
const delay = require('./util/delay');
const Config = require('./config');
const fs = require('fs');
const fsPromises = fs.promises;

let dir;

async function saveChannelInfo(channelId) {
  const data = await fetchChannelInfo(channelId, Config.Token);
  console.log(`fetch channel data: ${JSON.stringify(data, null, 2)}`);
  const channelName = data.channel.name || data.channel.user;
  dir = `${Config.Output}/${Config.Workspace}/channels/${channelName}`;
  await fsPromises.mkdir(dir, { recursive: true });
  fsPromises.writeFile(`${dir}/channel-info.txt`, JSON.stringify(data, null, 2));
}

async function saveMessages(channelId, latestTs) {
  const MAX_MSG = 1000;
  let cursor = '';
  try {
    let history = [];
    let replies = [];
    console.log('start fetching messages:', dir);
    while (true) {
      try {
        await delay(1000);
        const data = await fetchHistory(channelId, Config.Token, cursor, false, latestTs);
        latestTs = null;
        if (!data.ok) {
          // TODO: retry only when reaching rate limiting
          console.warn('retry fetchHistory', data);
          continue;
        }
        const msgs = data.messages;
        const latestMsgTime = dateFormat(epoch2date(msgs[msgs.length - 1].ts), 'YYYY-MM-DD HH-mm-ss');
        console.log('history', latestMsgTime, msgs.length);
        history = history.concat(msgs);
        for (let msg of msgs) {
          if (msg.thread_ts) {
            while (true) {
              await delay(1000);
              const data = await fetchReplies(channelId, Config.Token, msg.thread_ts);
              if (!data.ok) {
                console.warn('retry fetchReplies', data);
                continue;
              }
              const msgs = data.messages;
              const latestMsgTime = dateFormat(epoch2date(msgs[msgs.length - 1].ts), 'YYYY-MM-DD HH-mm-ss');
              console.log('replies', latestMsgTime, msgs.length);
              replies = replies.concat(msgs);
              break;
            }
          }
        }
        if (history.length >= MAX_MSG) {
          fsPromises.writeFile(`${dir}/messages ${latestMsgTime}.txt`, JSON.stringify(history, null, 2));
          fsPromises.writeFile(`${dir}/messages ${latestMsgTime} replies.txt`, JSON.stringify(replies, null, 2));
          history = [];
          replies = [];
        }
        if (!data.response_metadata) {
          if (data.has_more) console.log('fetchHistory', data);
          fsPromises.writeFile(`${dir}/messages ${latestMsgTime}.txt`, JSON.stringify(history, null, 2));
          fsPromises.writeFile(`${dir}/messages ${latestMsgTime} replies.txt`, JSON.stringify(replies, null, 2));
          break;
        }
        cursor = data.response_metadata.next_cursor;
      } catch (e) {
        // probably be ECONNRESET
        console.error(e);
        console.log('retry...');
      }
    }
  } catch (e) {
    console.error('saveMessages', e);
  }
  console.log('save messages completed:', dir);
}

const saveChannelMessages = async function (channelIds) {
  const channels = channelIds.split(',');
  for (const channel of channels) {
    await saveChannelInfo(channel);
    await saveMessages(channel);
  }
};

module.exports = saveChannelMessages;
