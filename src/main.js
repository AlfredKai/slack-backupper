const { Command } = require('commander');
const saveUserList = require('./save-user-list');

const program = new Command();

program.version('1.0.0');

program
  .command('user-list')
  .description('backup user list')
  .action(() => {
    saveUserList();
  });

program.parse(process.argv);
