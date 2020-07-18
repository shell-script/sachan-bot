# 🌸 Sachan

A multifunctional Telegram bot, built with [Telegraf](https://telegraf.js.org/). It is highly extensible and suitable as a scaffold/reference for your own bot.

A deployment of Sachan is live [@sachanbot](https://t.me/sachanbot).

## Setup

### Using [Vercel](http://vercel.com/) and Webhooks (recommended)

1. Add the following secrets to your Vercel account (or [create one](https://vercel.com/signup)):

   - `sachan_bot_bot_token`: Telegram bot token. The bot should be added to your **public** channel first. [Click here](http://t.me/BotFather) to create a bot.
   - **(Optional)** `sachan_bot_deepai_api_key`: [DeepAI](https://deepai.org/) API key for `/waifu2x` command.

2. [Deploy to Vercel](https://vercel.com/import/project?template=http://github.com/kidonng/sachan-bot)
3. [Set up the Webhook](https://core.telegram.org/bots/api#setwebhook): `https://api.telegram.org/bot<token>/setWebhook?url=<url>` (**Make sure to use a private URL!**)

### Using polling

1. Add the following environment variables:
   - `BOT_TOKEN`: Telegram bot token. [Click here](http://t.me/BotFather) to create a bot.
   - **(Optional)** `DEEPAI_API_KEY`: [DeepAI](https://deepai.org/) API key for `/waifu2x` command.
2. Install `sachan-bot` npm package
3. Run `sachan-bot` to launch the bot

## Why the name

That's how [Oomuro Nadeshiko](https://yuruyuri.fandom.com/wiki/Nadeshiko_%C5%8Cmuro) [calls](https://dynasty-scans.com/images/1262#:~:text=Sachan%20is%20Sakurako) her sister Sakurako.
