# Slack Backupper

## How to get user token

1. https://api.slack.com/ -> Your Apps -> Create New App
2. Features (app settings) -> OAuth & Permissions
3. Use `User token` and add OAuth scopes then the token will show up on top

## How to get channel id

Use slack web app and get it from url.

## Misc

Put your OAuth token in `Authorization` HTTP header instead of query string or you may get `invalid_auth`. ref: [Using tokens](https://api.slack.com/authentication/oauth-v2#using)

## TODO

- missing scope error
- use commander
