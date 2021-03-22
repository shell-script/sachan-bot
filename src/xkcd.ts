import got from 'got'
import { telegraf } from '.'
import { command, escape } from './utils'

// https://xkcd.com/json.html
interface Xkcd {
  month: string
  num: number
  link: string
  year: string
  news: string
  safe_title: string
  transcript: string
  alt: string
  img: string
  title: string
  day: string
}

telegraf.hears(command('xkcd'), async (ctx) => {
  const comic = ctx.match[1]
  const url = comic
    ? comic === 'random'
      ? (await got('https://c.xkcd.com/random/comic/')).url
      : `https://xkcd.com/${comic}/`
    : 'https://xkcd.com/'

  try {
    const { img, num, title, alt } = await got(`${url}info.0.json`).json<Xkcd>()
    ctx.replyWithPhoto(img, {
      caption: `${num}: [${escape(title)}](${url})\n${escape(alt)}`,
      parse_mode: 'MarkdownV2',
    })
  } catch {
    ctx.reply(`Comic ${comic} doesn't exist!`)
  }
})
