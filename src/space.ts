import { spacing } from 'pangu'
import { Component, handlers, MessageHandler } from './utils'

const handler: MessageHandler = ({ message, reply }) => {
  if (!message?.text) return

  reply(spacing(message.text))
}

export const space: Component = (telegraf) => {
  telegraf.command('space', ({ reply }) => {
    handlers.message = handler
    reply('Send me a text which you want to insert whitespaces in.')
  })
}
