import { format } from 'prettier'
import { Component, handlers, MessageHandler } from './utils'

const handler: MessageHandler = ({ message, replyWithMarkdownV2 }) =>
  replyWithMarkdownV2(
    `\`${format(JSON.stringify(message), { parser: 'json' })}\``
  )

export const json: Component = (telegraf) => {
  telegraf.command('json', ({ reply }) => {
    handlers.message = handler
    reply('Send or forward me a message which you want to get JSON data of.')
  })
}
