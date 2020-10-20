import got from 'got'
import isIp from 'is-ip'
import outdent from 'outdent'
import { Component, escape, command } from './utils'

export const ip: Component = (telegraf) => {
  telegraf.hears(
    command('ip'),
    async ({
      match,
      telegram,
      message,
      reply,
      replyWithMarkdownV2,
      replyWithLocation,
    }) => {
      const extra = {
        reply_to_message_id: message!.message_id,
      }
      const text = match![1]
      if (!text || !isIp(text))
        return reply('Please enter a valid IP address.', extra)

      try {
        // https://ip.sb/api/
        const {
          ip,
          asn,
          organization,
          city,
          region,
          country,
          latitude,
          longitude,
        } = await got(`https://api.ip.sb/geoip/${text}`).json()

        telegram.webhookReply = false
        await replyWithMarkdownV2(
          escape(outdent`
          *IP* ${ip}
          *ASN* ${asn ? `AS${asn} (${organization})` : 'Unknown'}
          *Location* ${
            asn
              ? `${city ? `${city}, ` : ''}${
                  region ? `${region}, ` : ''
                }${country} (${latitude},${longitude})`
              : 'Unknown'
          }
        `),
          extra
        )
        telegram.webhookReply = true
        if (asn) replyWithLocation(latitude, longitude, extra)
      } catch (e) {
        reply(JSON.parse(e.response.body).message, extra)
      }
    }
  )
}
