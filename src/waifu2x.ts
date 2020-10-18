import got from 'got'
import FormData from 'form-data'
import { last } from 'lodash'
import { Component, handlers, MessageHandler, escape } from './utils'

const { DEEPAI_API_KEY } = process.env

const handler: MessageHandler = async ({
  message,
  telegram,
  reply,
  replyWithDocument,
}) => {
  if (!message?.photo) return
  telegram.webhookReply = false
  await reply('Processing...')

  const { file_id } = last(message.photo)!
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
  replyWithDocument({
    url: output_url,
    filename: 'waifu2x.png',
  })
}

export const waifu2x: Component = (telegraf) => {
  telegraf.command('waifu2x', ({ reply, replyWithMarkdownV2 }) => {
    if (!DEEPAI_API_KEY) {
      replyWithMarkdownV2(escape('No `DEEPAI_API_KEY` provided.'))
      return
    }

    handlers.message = handler
    reply('Send me a photo you want to upscale.')
  })
}
