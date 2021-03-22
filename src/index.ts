import { Telegraf } from 'telegraf'
import { botInfo } from './utils'

const { BOT_TOKEN, IS_VERCEL } = process.env

export const telegraf = new Telegraf(BOT_TOKEN!)
require('./help')
require('./ip')
require('./json')
require('./space')
require('./start')
require('./time')
require('./unu')
require('./waifu2x')
require('./fallback')

if (!IS_VERCEL) {
  telegraf.telegram.webhookReply = false

  telegraf.telegram.getMe().then((user) => {
    Object.assign(botInfo, user)
    telegraf.launch()
  })
}
