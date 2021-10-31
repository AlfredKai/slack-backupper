const { Command } = require('commander');
const saveUserList = require('./save-user-list');
const saveEmojiList = require('./save-emoji-list');
const saveChannelMessages = require('./save-messages');

const program = new Command();

program.version('1.0.0');

program
  .command('user-list')
  .description('backup user list')
  .action(() => {
    saveUserList();
  });

program
  .command('emoji-list')
  .description('backup emoji-list')
  .action(() => {
    saveEmojiList();
  });

program
  .command('messages')
  .argument('<channelIds>', 'channel ids')
  .description('backup messages')
  .action((channelIds) => {
    saveChannelMessages(channelIds);
  });

program.parse(process.argv);
