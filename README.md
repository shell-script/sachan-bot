# 🌸 Sachan

Source code for Telegram bot [@sachanbot](https://t.me/sachanbot), a multifunctional Telegram bot built with [Telegraf](https://telegraf.js.org/). It is highly extensible and suitable as a scaffold/reference for your own bot.

## Setup

The following environment variables should be provided:

- `BOT_TOKEN`: Telegram bot token. [Click here](http://t.me/BotFather) to create a bot.
- **(Optional)** `DEEPAI_API_KEY`: [DeepAI](https://deepai.org/) API key for `/waifu2x` command.

### Using [Vercel](http://vercel.com/) and Webhooks (recommended)

1. Configure the environment variables in [`vercel.json`](vercel.json).
2. [Deploy to Vercel](https://vercel.com/import/project?template=http://github.com/kidonng/sachan-bot).
3. [Set up the Webhook](https://core.telegram.org/bots/api#setwebhook): `https://api.telegram.org/bot<token>/setWebhook?url=<url>` (**Make sure to use a private URL!**)

### Using polling

1. Configure the environment variables.
2. Install `sachan-bot` npm package.
3. Run `sachan-bot` to launch the bot.

## Why the name

That's how [Himawari](https://yuruyuri.fandom.com/wiki/Himawari_Furutani) calls [Sakurako](https://yuruyuri.fandom.com/wiki/Sakurako_%C5%8Cmuroac).
