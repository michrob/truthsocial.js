export interface TruthToken {
  access_token: string
  token_type: string // 'Bearer'
  scope: string // as space seperated list e.g. 'read write follow'
  created_at: number
}

export type TruthScope = 'read' | 'write' | 'follow' | 'push'

export interface TruthLoginParams {
  client_id: string
  client_secret: string
  scope: TruthScope[]
  grant_type: 'password'
  username: string
  password: string
}
