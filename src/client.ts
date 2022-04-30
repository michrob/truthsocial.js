import { CLIENT_ID, CLIENT_SECRET } from './config'
import { executeLogin, fetchAccount, fetchVerifyAccount } from './api'
import { TruthToken } from './types/auth'

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

  account = async (accountId: string) => fetchAccount(accountId, this.token)

  verifyCredentials = async () => fetchVerifyAccount(this.token)
}
