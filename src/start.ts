import outdent from 'outdent'
import { Component, botInfo } from './utils'

export const start: Component = (telegraf) => {
  telegraf.start(({ reply }) =>
    reply(outdent`
      Howdy! I'm ${botInfo.first_name}, a multifunctional Telegram bot.
      Checkout my source code at https://github.com/kidonng/sachan-bot.
    `)
  )
}
