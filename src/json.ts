import { Context } from 'telegraf/typings'
import { telegraf } from '.'
import { handlers, command } from './utils'

const handler = (ctx: Context) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }

  ctx.replyWithMarkdownV2(`\`${JSON.stringify(ctx.message, null, 2)}\``, extra)
}

telegraf.hears(command('json'), (ctx) => {
  handlers.message = handler

  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }
  ctx.reply(
    'Send or forward me a message which you want to get JSON data of.',
    extra
  )
})
