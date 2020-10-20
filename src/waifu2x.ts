import got from 'got'
import FormData from 'form-data'
import { last } from 'lodash'
import { Component, handlers, MessageHandler, escape, command } from './utils'

const { DEEPAI_API_KEY } = process.env

const handler: MessageHandler = async ({
  message,
  telegram,
  reply,
  replyWithDocument,
}) => {
  const extra = {
    reply_to_message_id: message!.message_id,
  }
  if (!message!.photo) return

  telegram.webhookReply = false
  await reply('Processing...', extra)

  const { file_id } = last(message!.photo)!
  const image = await telegram.getFileLink(file_id)

  const form = new FormData()
  form.append('image', image)

  // https://deepai.org/machine-learning-model/waifu2x
  const { output_url } = await got
    .post('https://api.deepai.org/api/waifu2x', {
      headers: {
        'Api-Key': DEEPAI_API_KEY,
      },
      body: form,
    })
    .json()

  telegram.webhookReply = true
  replyWithDocument(
    {
      url: output_url,
      filename: 'waifu2x.png',
    },
    extra
  )
}

export const waifu2x: Component = (telegraf) => {
  telegraf.hears(
    command('waifu2x'),
    ({ message, reply, replyWithMarkdownV2 }) => {
      const extra = {
        reply_to_message_id: message!.message_id,
      }

      if (!DEEPAI_API_KEY) {
        replyWithMarkdownV2(escape('No `DEEPAI_API_KEY` provided.'), extra)
        return
      }

      handlers.message = handler
      reply('Send me a photo you want to upscale.', extra)
    }
  )
}
