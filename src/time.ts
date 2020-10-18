import outdent from 'outdent'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Component, escape, command } from './utils'

dayjs.extend(utc)
dayjs.extend(timezone)

const regions: Record<
  string,
  {
    name: string
    timezone: string
  }
> = {
  FR: {
    name: '🇫🇷 Paris, France',
    timezone: 'Europe/Paris',
  },
  JP: {
    name: '🇯🇵 Tokyo, Japan',
    timezone: 'Asia/Tokyo',
  },
  LA: {
    name: '🇺🇸 Los Angeles, US',
    timezone: 'America/Los_Angeles',
  },
  NY: {
    name: '🇺🇸 New York, US',
    timezone: 'America/New_York',
  },
  RU: {
    name: '🇷🇺 Moscow, Russia',
    timezone: 'Europe/Moscow',
  },
  UK: {
    name: '🇬🇧 London, UK',
    timezone: 'Europe/London',
  },
}
const format = 'MM-DD HH:mm'

export const time: Component = (telegraf) => {
  telegraf.hears(
    command('time', true),
    async ({ match, replyWithMarkdownV2 }) => {
      const text = match![1]
      const now = dayjs()

      if (text && !regions.hasOwnProperty(text))
        return replyWithMarkdownV2(
          `Please enter an available regions: ${Object.keys(regions)
            .map((region) => `\`${region}\``)
            .join(', ')}`
        )

      replyWithMarkdownV2(
        escape(outdent`
          *🕒 UTC* \`${now.utc().format(format)}\`
          *🇨🇳 Beijing, China* \`${now.tz('Asia/Shanghai').format(format)}\`
          ${
            text
              ? `*${regions[text].name}* \`${now
                  .tz(regions[text].timezone)
                  .format(format)}\``
              : Object.values(regions)
                  .map(
                    (region) =>
                      `*${region.name}* \`${now
                        .tz(region.timezone)
                        .format(format)}\``
                  )
                  .join('\n')
          }
        `)
      )
    }
  )
}
