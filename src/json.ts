import { format } from 'prettier'
import { Component, handlers, MessageHandler, command } from './utils'

const handler: MessageHandler = ({ message, replyWithMarkdownV2 }) => {
  const extra = {
    reply_to_message_id: message!.message_id,
  }

  replyWithMarkdownV2(
    `\`${format(JSON.stringify(message), { parser: 'json' })}\``,
    extra
  )
}

export const json: Component = (telegraf) => {
  telegraf.hears(command('json', true), ({ message, reply }) => {
    handlers.message = handler

    const extra = {
      reply_to_message_id: message!.message_id,
    }
    reply(
      'Send or forward me a message which you want to get JSON data of.',
      extra
    )
  })
}
