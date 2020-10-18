import got from 'got'
import isUrl from 'is-url-superb'
import outdent from 'outdent'
import { Component, escape, command } from './utils'

export const unu: Component = (telegraf) => {
  telegraf.hears(
    command('unu'),
    async ({ match, reply, replyWithMarkdownV2 }) => {
      const text = match![1]
      if (!isUrl(text)) return reply('Please enter a valid URL.')

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
  )
}
