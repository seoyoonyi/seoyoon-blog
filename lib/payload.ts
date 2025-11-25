import { Payload, getPayload } from 'payload'

import config from '../payload.config'

let cachedPayload: Payload | null = null

export const getPayloadClient = async () => {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({
    config,
  })

  return cachedPayload
}
