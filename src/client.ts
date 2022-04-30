import { CLIENT_ID, CLIENT_SECRET } from './config'
import { executeLogin, truthAPIv1Call } from './api'
import { TruthToken } from './types/auth'
import { TruthAccount, TruthAccountVerification } from './types/account'
import { Truth } from './types/status'

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

  status = async (statusId: string) =>
    truthAPIv1Call<Truth>(`/statuses/${statusId}`, this.token)
}
