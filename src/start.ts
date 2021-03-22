import outdent from 'outdent'
import { telegraf } from '.'
import { botInfo } from './utils'

telegraf.start((ctx) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }

  ctx.reply(
    outdent`
      Howdy! I'm ${botInfo.first_name}, a multifunctional Telegram bot.
      Checkout my source code at https://github.com/kidonng/sachan-bot.
    `,
    extra
  )
})
