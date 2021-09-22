# Slack Backupper

## Prepare your env file

Mac/Linux:

```bash
export CHANNEL_ID=[Channel Id]
export TOKEN=xoxp-[OAuth Tokens for Your Workspace]
export WORKSPACE=[Workspace's name]
```

Windows

```bat
set CHANNEL_ID=[channel id]
set TOKEN=xoxp-[OAuth Tokens for Your Workspace]
set WORKSPACE=[Workspace's name]
```

## How to get user token

1. https://api.slack.com/ -> Your Apps -> Create New App
2. Features (app settings) -> OAuth & Permissions
3. Use `User token` and add OAuth scopes then the token will show up on top

## How to get channel id

Use slack web app and get it from url.

## Permission Scopes

For user list you need:

- user:read

## Usage

```js
node src/save-emoji
```

```js
node src/save-user-list
```

```js
node src/save-messages
```

files:

1.

```js
node src/url-extractor
```

2. past urls into devtool-download-helper.js
3. host devtool-download-helper.js at 127.0.0.1:5500
4. past append-script.js into devTool console (the tab's url should be the same origin with file's url)

## Misc

Put your OAuth token in `Authorization` HTTP header instead of query string or you may get `invalid_auth`. ref: [Using tokens](https://api.slack.com/authentication/oauth-v2#using)

## TODO

- missing scope error
- use commander
