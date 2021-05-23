import { VercelRequest, VercelResponse } from '@vercel/node'
import { telegraf, loadModules } from '../src'
import { handlers, botInfo } from '../src/utils'

export default async ({ body }: VercelRequest, res: VercelResponse) => {
  handlers.response = res

  const user = await telegraf.telegram.getMe()
  Object.assign(botInfo, user)
  loadModules()
  return telegraf.handleUpdate(body, res)
}
