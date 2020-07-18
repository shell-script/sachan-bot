import outdent from 'outdent'
import { Component, escape } from './utils'

export const help: Component = (telegraf) => {
  telegraf.help(({ replyWithMarkdownV2 }) => {
    replyWithMarkdownV2(
      escape(outdent`
        */ip*
        Get location data associated with a IP address.

        */json*
        Get formatted JSON data of a message.

        */space*
        Insert whitespaces between CJK and half-width characters.

        */unu*
        Shorten a link using \`u.nu\`.

        */waifu2x*
        Upscale a photo using \`waifu2x\`.
        Max resolution of a scaled photo is 1600x1600.
      `)
    )
  })
}
