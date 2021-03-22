import outdent from 'outdent'
import { telegraf } from '.'
import { escape } from './utils'

telegraf.help((ctx) => {
  const extra = {
    reply_to_message_id: ctx.message!.message_id,
  }

  ctx.replyWithMarkdownV2(
    escape(outdent`
      */ip* <IP>
      Get location data associated with a IP address.

      */json*
      Get formatted JSON data of a message.

      */space* <Text>
      Insert whitespaces between CJK and half-width characters.

      */time* [Region]
      Get date and time info of UTC, China and given region.

      */unu* <Link>
      Shorten a link using \`u.nu\`.

      */waifu2x*
      Upscale a photo using \`waifu2x\`.
      Max resolution of a scaled photo is 1600x1600.
    `),
    extra
  )
})
