import outdent from 'outdent'
import { telegraf } from '.'
import { escape } from './utils'

telegraf.help((ctx) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }

  ctx.replyWithMarkdownV2(
    escape(outdent`
      */ip* <address>
      Get location data associated with a IP address.

      */json*
      Get formatted JSON data of the next message.

      */time* [region]
      Get date and time info of UTC, China and given region.
      If no region is specified, time of all regions will be sent.

      */unu* <link>
      Shorten a link using \`u.nu\`.

      */waifu2x*
      Upscale the next photo using \`waifu2x\`.
      Max resolution of a scaled photo is 1600x1600.

      */xkcd [number]*
      View xkcd comics.
      If no number is specified, the latest chapter will be sent.
      To view a random comic, use */xkcd random*.
    `),
    extra
  )
})
