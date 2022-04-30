import fetch from 'isomorphic-fetch'
import { stringify } from 'query-string'
import { OAUTH_URL, COMMON_HEADERS, API_V1_URL } from './config'
import { TruthAccount, TruthAccountVerification } from './types/account'
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

export const fetchVerifyAccount = async (
  token: TruthToken
): Promise<TruthAccountVerification> => {
  const response = await fetch(`${API_V1_URL}/accounts/verify_credentials`, {
    headers: {
      ...COMMON_HEADERS,
      Authorization: `${token.token_type} ${token.access_token}`
    },
    method: 'GET'
  })
  return await response.json()
}

export const fetchAccount = async (
  accountId: string,
  token: TruthToken
): Promise<TruthAccount> => {
  const response = await fetch(`${API_V1_URL}/accounts/${accountId}`, {
    headers: {
      ...COMMON_HEADERS,
      Authorization: `${token.token_type} ${token.access_token}`
    },
    method: 'GET'
  })
  return await response.json()
}
