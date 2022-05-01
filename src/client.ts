import { CLIENT_ID, CLIENT_SECRET } from './config'
import { executeLogin, truthAPIv1Call } from './api'
import { TruthToken } from './types/auth'
import { TruthAccount, TruthAccountVerification } from './types/account'
import { Truth } from './types/status'
import { TruthFollow } from './types/follow'
import { TruthTrend } from './types/trend'

export class TruthClient {
  private token: TruthToken

  login = async (username: string, password: string) => {
    this.token = await executeLogin({
      username,
      password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: ['read', 'write', 'follow', 'push'],
      grant_type: 'password'
    })
    return this.token
  }

  verifyCredentials = async () =>
    truthAPIv1Call<TruthAccountVerification>(
      `/accounts/verify_credentials`,
      this.token
    )

  account = async (accountId: string) =>
    truthAPIv1Call<TruthAccount>(`/accounts/${accountId}`, this.token)

  accountStatuses = async (accountId: string, excludeReplies?: boolean) =>
    truthAPIv1Call<Truth[]>(
      `/accounts/${accountId}/statuses?exclude_replies=${!!excludeReplies}`,
      this.token
    )

  accountLookup = async (accountName: string) =>
    truthAPIv1Call<TruthAccount>(
      `/accounts/lookup?acct=${accountName}`,
      this.token
    )

  status = async (statusId: string) =>
    truthAPIv1Call<Truth>(`/statuses/${statusId}`, this.token)

  trends = async () => truthAPIv1Call<TruthTrend[]>(`/trends`, this.token)

  follow = async (accountId: string) =>
    truthAPIv1Call<TruthFollow>(
      `/accounts/${accountId}/follow`,
      this.token,
      `POST`
    )
}
