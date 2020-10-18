import Telegraf from 'telegraf'
import { fallback } from './fallback'
import { help } from './help'
import { ip } from './ip'
import { json } from './json'
import { space } from './space'
import { start } from './start'
import { time } from './time'
import { unu } from './unu'
import { waifu2x } from './waifu2x'
import { IContext, botInfo } from './utils'

const { BOT_TOKEN, IS_VERCEL } = process.env

export const telegraf = new Telegraf<IContext>(BOT_TOKEN!)

telegraf.telegram.getMe().then((user) => {
  Object.assign(botInfo, user)

  const components = [
    help,
    ip,
    json,
    space,
    start,
    time,
    unu,
    waifu2x,
    fallback,
  ]
  for (const component of components) component(telegraf)
})

if (!IS_VERCEL) {
  telegraf.webhookReply = false
  telegraf.launch()
}
