// src/lib/notion-types.ts
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'

export function isFullPageResponse(
  response: CreatePageResponse
): response is Extract<CreatePageResponse, { url: string }> {
  return 'url' in response
}