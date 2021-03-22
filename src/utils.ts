import { Context } from 'telegraf/typings'
import { UserFromGetMe } from 'typegram'
import { VercelResponse } from '@vercel/node'

// https://stackoverflow.com/a/60145565
export const escape = (text: string) =>
  text.replace(/(\[[^\][]*]\(http[^()]*\))|[[\]()>#+\-=|{}.!]/gi, (x, y) =>
    y ? y : '\\' + x
  )

export const handlers: {
  response?: VercelResponse
  message?(ctx: Context): void
} = {}

export const botInfo: Partial<UserFromGetMe> = {}

export const command = (name: string) =>
  RegExp(`^/${name}(?:@${botInfo.username})?(?: (.+))?`)
