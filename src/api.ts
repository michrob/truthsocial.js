import fetch from 'isomorphic-fetch'
import { stringify } from 'query-string'
import { OAUTH_URL, COMMON_HEADERS, API_V1_URL } from './config'
import { TruthLoginParams, TruthToken } from './types/auth'

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

export const truthAPIv1Call = async <ReturnType>(
  path: string,
  token: TruthToken,
  method: `GET` | `POST` = 'GET'
): Promise<ReturnType> => {
  const response = await fetch(`${API_V1_URL}${path}`, {
    method,
    headers: {
      ...COMMON_HEADERS,
      Authorization: `${token.token_type} ${token.access_token}`
    }
  })
  return await response.json()
}
