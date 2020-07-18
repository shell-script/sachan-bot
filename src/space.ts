import { spacing } from 'pangu'
import { Component, message, Handler } from './utils'

const handler: Handler = ({ message, reply }) => {
  if (!message?.text) return

  reply(spacing(message.text))
}

export const space: Component = (telegraf) => {
  telegraf.command('space', ({ reply }) => {
    message.handler = handler
    reply('Send me a text which you want to insert whitespaces in.')
  })
}
