import Telegraf from 'telegraf'
import { help } from './help'
import { ip } from './ip'
import { json } from './json'
import { space } from './space'
import { start } from './start'
import { unu } from './unu'
import { waifu2x } from './waifu2x'
import { IContext, message, request } from './utils'

const { BOT_TOKEN, IS_VERCEL } = process.env

if (!BOT_TOKEN)
  throw Error('Please provide BOT_TOKEN as an environment variable')

export const telegraf = new Telegraf<IContext>(BOT_TOKEN)

help(telegraf)
ip(telegraf)
json(telegraf)
space(telegraf)
start(telegraf)
unu(telegraf)
waifu2x(telegraf)

telegraf.on('message', (ctx) => {
  const { handler } = message
  if (handler) {
    delete message.handler
    return handler(ctx)
  }

  // Workaround for skipping unhandled messages
  // https://github.com/telegraf/telegraf/issues/1089
  if (ctx.telegram.webhookReply) {
    request.handler!.status(200).end()
  }
})

if (!IS_VERCEL) telegraf.launch()
