import { spacing } from 'pangu'
import { Component, command } from './utils'

export const space: Component = (telegraf) => {
  telegraf.hears(command('space'), ({ match, message, reply }) => {
    const extra = {
      reply_to_message_id: message!.message_id,
    }
    const text = match![1]
    if (!text) return reply('Please enter a string for spacing.', extra)

    reply(spacing(text), extra)
  })
}
