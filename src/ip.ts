import got from 'got'
import isIp from 'is-ip'
import outdent from 'outdent'
import { Component, message, Handler, escape } from './utils'

const handler: Handler = async ({
  message,
  telegram,
  reply,
  replyWithMarkdownV2,
  replyWithLocation,
}) => {
  const text = message?.text
  if (!text) return
  if (!isIp(text)) return reply(`That's an invalid IP address.`)

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
      *Location* ${city ? `${city}, ` : ''}${
      region ? `${region}, ` : ''
    }${country} (${latitude},${longitude})
    `)
  )
  telegram.webhookReply = true
  replyWithLocation(latitude, longitude)
}

export const ip: Component = (telegraf) => {
  telegraf.command('ip', ({ reply }) => {
    message.handler = handler
    reply('Send me a IPv4/IPv6 address which you want to get location data of.')
  })
}
