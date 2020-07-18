import outdent from 'outdent'
import { Component } from './utils'

export const start: Component = (telegraf) => {
  telegraf.start(async ({ reply, telegram }) => {
    const { first_name } = await telegram.getMe()

    reply(outdent`
      Howdy! I'm ${first_name}, a multifunctional Telegram bot.
      Checkout my source code at https://github.com/kidonng/sachan-bot.
    `)
  })
}
