import fetch from 'isomorphic-fetch'
import { stringify } from 'query-string'
import { OAUTH_URL, COMMON_HEADERS, API_V1_URL, API_V2_URL } from './config'
import { TruthLoginParams, TruthToken } from './types/auth'

type HTTPMethod = `GET` | `POST` | `DELETE`

interface TruthBodyParams {
  type: `params`
  data: string
}

interface TruthBodyFile {
  type: `file`
  data: Buffer
}

export type TruthHTTPBody = TruthBodyFile | TruthBodyParams

const bodyContentType = {
  params: `application/x-www-form-urlencoded; charset=utf-8`,
  file: `multipart/form-data; boundary=MastodonKitBoundary`
}

const postHeaders = (body?: TruthHTTPBody) =>
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

export const executeLogin = async (
  params: TruthLoginParams
): Promise<TruthToken> => {
  const response = await fetch(OAUTH_URL, {
    headers: COMMON_HEADERS,
    body: stringify({ ...params, scope: params.scope.join(' ') }),
    method: 'POST'
  })
  return await response.json()
}

const truthAPICall = async <ReturnType>(
  endpoint: string,
  path: string,
  token: TruthToken,
  method: HTTPMethod = 'GET',
  body?: TruthHTTPBody
): Promise<ReturnType> => {
  const response = await fetch(`${endpoint}${path}`, {
    body: !!body ? body.data : undefined,
    method,
    headers: {
      ...COMMON_HEADERS,
      Authorization: `${token.token_type} ${token.access_token}`,
      ...postHeaders(body)
    }
  })
  return await response.json()
}

export const truthAPIv1Call = async <ReturnType>(
  path: string,
  token: TruthToken,
  method: HTTPMethod = 'GET',
  body?: TruthHTTPBody
): Promise<ReturnType> => truthAPICall(API_V1_URL, path, token, method, body)

export const truthAPIv2Call = async <ReturnType>(
  path: string,
  token: TruthToken,
  method: HTTPMethod = 'GET',
  body?: TruthHTTPBody
): Promise<ReturnType> => truthAPICall(API_V2_URL, path, token, method, body)
