import got from 'got'
import isUrl from 'is-url-superb'
import outdent from 'outdent'
import { Component, message, Handler, escape } from './utils'

const handler: Handler = async ({ message, reply, replyWithMarkdownV2 }) => {
  const text = message?.text
  if (!text) return
  if (!isUrl(text)) return reply(`That's an unvalid URL.`)

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

  replyWithMarkdownV2(
    escape(outdent`
      *Original* ${text}${text === url ? '' : `\n*Redirected* ${url}`}
      *Shortened* ${short}
    `)
  )
}

export const unu: Component = (telegraf) => {
  telegraf.command('unu', ({ reply }) => {
    message.handler = handler
    reply('Send me a link which you want to shorten.')
  })
}
