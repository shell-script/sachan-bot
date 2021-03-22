import got from 'got'
import isUrl from 'is-url-superb'
import outdent from 'outdent'
import { telegraf } from '.'
import { escape, command } from './utils'

telegraf.hears(command('unu'), async (ctx) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }
  const text = ctx.match![1]
  if (!text || !isUrl(text))
    return ctx.reply('Please enter a valid URL.', extra)

  // Final URL after redirects
  const { url } = await got(text)
  // https://u.nu/api
  const short = await got('https://u.nu/api.php', {
    searchParams: {
      action: 'shorturl',
      format: 'simple',
      url,
    },
  }).text()

  ctx.replyWithMarkdownV2(
    escape(outdent`
        *Original* ${text}${text === url ? '' : `\n*Redirected* ${url}`}
        *Shortened* ${short}
      `),
    extra
  )
})
