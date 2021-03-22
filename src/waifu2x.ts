import got from 'got'
import FormData from 'form-data'
import { last } from 'lodash'
import { Context } from 'telegraf/typings'
import { telegraf } from '.'
import { handlers, escape, command } from './utils'

const { DEEPAI_API_KEY } = process.env

const handler = async (ctx: Context) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }
  // Type guard
  // https://github.com/telegraf/telegraf/issues/1388#issuecomment-791573609
  if (!('photo' in ctx.message!)) return

  ctx.telegram.webhookReply = false
  await ctx.reply('Processing...', extra)

  const { file_id } = last(ctx.message!.photo)!
  const image = await ctx.telegram.getFileLink(file_id)

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

  ctx.telegram.webhookReply = true
  ctx.replyWithDocument(
    {
      url: output_url,
      filename: 'waifu2x.png',
    },
    extra
  )
}

telegraf.hears(command('waifu2x'), (ctx) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }

  if (!DEEPAI_API_KEY) {
    ctx.replyWithMarkdownV2(escape('No `DEEPAI_API_KEY` provided.'), extra)
    return
  }

  handlers.message = handler
  ctx.reply('Send me a photo you want to upscale.', extra)
})
