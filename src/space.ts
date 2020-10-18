import { spacing } from 'pangu'
import { Component, command } from './utils'

export const space: Component = (telegraf) => {
  telegraf.hears(command('space'), ({ match, reply }) => {
    const text = match![1]

    reply(spacing(text))
  })
}
