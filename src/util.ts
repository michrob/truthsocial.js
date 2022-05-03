import { TruthHTTPBody } from './api'
import { TruthAccountUpdateRequest } from './types'

const bodyContentType = {
  params: `application/x-www-form-urlencoded; charset=utf-8`,
  file: `multipart/form-data; boundary=MastodonKitBoundary`
}

export const postHeaders = (body?: TruthHTTPBody) =>
  !!body
    ? {
        'Content-Length': `${body.data.length}`,
        'Content-Type': bodyContentType[body.type]
      }
    : {}

export const truthAttachment = (data: Buffer, mimetype: string) => {
  const header = Buffer.from(
    `--MastodonKitBoundary\r\n` +
      `Content-Disposition: form-data; name="file"; filename="file.jpg"\r\n` +
      `Content-Type: ${mimetype}\r\n`
  )
  const footer = Buffer.from(`--MastodonKitBoundary--\r\n`)
  return Buffer.concat([header, Buffer.from(`\r\n`), data, footer])
}

type TruthAccountMedia = {
  mimetype: string
  data: Buffer
}

export interface TruthAccountUpdate {
  displayName?: string
  website?: string
  bio?: string
  location?: string
  avatar?: TruthAccountMedia
  header?: TruthAccountMedia
}

const imageToBase64Url = (image: { mimetype: string; data: Buffer }) =>
  `data:${image.mimetype};base64,${image.data.toString('base64')}`

export const truthAccountUpdate = (
  request: TruthAccountUpdate
): TruthAccountUpdateRequest => ({
  display_name: request.displayName,
  website: request.website,
  note: request.bio,
  location: request.location,
  avatar: request.avatar ? imageToBase64Url(request.avatar) : undefined,
  header: request.header ? imageToBase64Url(request.header) : undefined
})
