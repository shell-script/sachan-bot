import got from 'got'
import isIp from 'is-ip'
import outdent from 'outdent'
import { telegraf } from '.'
import { escape, command } from './utils'

telegraf.hears(command('ip'), async (ctx) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }
  const text = ctx.match![1]
  if (!text || !isIp(text))
    return ctx.reply('Please enter a valid IP address.', extra)

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

    ctx.telegram.webhookReply = false
    await ctx.replyWithMarkdownV2(
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
    ctx.telegram.webhookReply = true
    if (asn) ctx.replyWithLocation(latitude, longitude, extra)
  } catch (e) {
    ctx.reply(JSON.parse(e.response.body).message, extra)
  }
})
