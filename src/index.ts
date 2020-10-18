import Telegraf from 'telegraf'
import { help } from './help'
import { ip } from './ip'
import { json } from './json'
import { space } from './space'
import { start } from './start'
import { unu } from './unu'
import { waifu2x } from './waifu2x'
import { IContext, handlers } from './utils'

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
  const { message } = handlers
  if (message) {
    delete handlers.message
    return message(ctx)
  }

  // Workaround for skipping unhandled messages
  // https://github.com/telegraf/telegraf/issues/1089
  if (ctx.telegram.webhookReply) {
    handlers.response!.status(200).end()
  }
})

if (!IS_VERCEL) {
  telegraf.webhookReply = false
  telegraf.launch()
}
