import outdent from 'outdent'
import { Component, escape } from './utils'

export const help: Component = (telegraf) => {
  telegraf.help(({ message, replyWithMarkdownV2 }) => {
    const extra = {
      reply_to_message_id: message!.message_id,
    }

    replyWithMarkdownV2(
      escape(outdent`
        */ip* <IP>
        Get location data associated with a IP address.

        */json*
        Get formatted JSON data of a message.

        */space* <Text>
        Insert whitespaces between CJK and half-width characters.

        */time* <Region>
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
}
