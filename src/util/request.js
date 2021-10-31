const https = require('https');

const MissingScopeError = require('./MissingScopeError');

function request(url, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = [];

      res.on('data', (chunk) => {
        data.push(chunk);
      });

      res.on('end', () => {
        const res = JSON.parse(Buffer.concat(data).toString());
        if (res.ok === false) {
          switch (res.error) {
            case 'missing_scope':
              reject(new MissingScopeError(res.needed, res.provided));
              break;
            case 'channel_not_found':
              const message = "channel not found, if it's private channel, plz use scope: 'groups:read'";
              reject(new Error(message));
              break;
            default:
              reject(new Error(`undefined slack error: ${JSON.stringify(res)}`));
              break;
          }
        }
        resolve(res);
      });
    });

    req.on('error', (error) => {
      return reject(error);
    });

    req.end();
  });
}

module.exports = request;
