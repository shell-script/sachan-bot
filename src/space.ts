import { spacing } from 'pangu'
import { telegraf } from '.'
import { command } from './utils'

telegraf.hears(command('space'), (ctx) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }
  const text = ctx.match![1]
  if (!text) return ctx.reply('Please enter a string for spacing.', extra)

  ctx.reply(spacing(text), extra)
})
