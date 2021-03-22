import { telegraf } from '.'
import { handlers } from './utils'

telegraf.on('message', (ctx) => {
  const { message } = handlers
  if (message) {
    delete handlers.message
    return message(ctx)
  }
})
