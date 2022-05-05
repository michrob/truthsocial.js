import { CLIENT_ID, CLIENT_SECRET } from './config'
import { executeLogin, truthAPIv1Call, truthAPIv2Call } from './api'
import { TruthToken } from './types/auth'
import { TruthAccount, TruthAccountVerification } from './types/account'
import { Truth, TruthContext, TruthMediaAttachment } from './types/status'
import { TruthFollow } from './types/follow'
import { TruthTrend } from './types/trend'
import { TruthSuggestion } from './types/suggestion'
import { TruthRelationship } from './types/relationship'
import { stringify } from 'query-string'
import { TruthSearchResults, TruthSearchType } from './types/search'
import { truthAccountUpdate, TruthAccountUpdate, truthAttachment } from './util'

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

  updateAccount = async (request: TruthAccountUpdate) =>
    truthAPIv1Call<TruthAccount>(
      `/accounts/update_credentials`,
      this.token,
      `PATCH`,
      { type: `params`, data: stringify(truthAccountUpdate(request)) }
    )

  relationships = async (accountIds: string[]) =>
    truthAPIv1Call<TruthRelationship[]>(
      `/accounts/relationships?${stringify({ 'id[]': accountIds })}`,
      this.token
    )

  search = async (query: string, type: TruthSearchType) =>
    truthAPIv2Call<TruthSearchResults>(
      `/search/?q=${query}&type=${type}&resolve=true`,
      this.token
    )

  postMedia = async (data: Buffer, mimetype: string) =>
    truthAPIv1Call<TruthMediaAttachment>(`/media`, this.token, `POST`, {
      data: truthAttachment(data, mimetype),
      type: `file`
    })

  postStatus = async (status: string, mediaIds: string[]) =>
    truthAPIv1Call<Truth>(`/statuses`, this.token, 'POST', {
      data: stringify({
        status,
        visibility: 'public',
        ...(mediaIds?.length > 0 ? { 'media_ids[]': mediaIds } : {})
      }),
      type: `params`
    })

  deleteStatus = async (statusId: string) =>
    truthAPIv1Call<Truth>(`/statuses/${statusId}`, this.token, 'DELETE')

  block = async (accountId: string) =>
    truthAPIv1Call<TruthRelationship>(
      `/accounts/${accountId}/block`,
      this.token,
      `POST`
    )

  unblock = async (accountId: string) =>
    truthAPIv1Call<TruthRelationship>(
      `/accounts/${accountId}/unblock`,
      this.token,
      `POST`
    )

  blocks = async () => truthAPIv1Call<TruthAccount[]>(`/blocks`, this.token)

  mute = async (accountId: string) =>
    truthAPIv1Call<TruthRelationship>(
      `/accounts/${accountId}/mute`,
      this.token,
      `POST`
    )

  unmute = async (accountId: string) =>
    truthAPIv1Call<TruthRelationship>(
      `/accounts/${accountId}/unmute`,
      this.token,
      `POST`
    )

  mutes = async () => truthAPIv1Call<TruthAccount[]>(`/mutes`, this.token)

  status = async <T extends TruthContext | undefined = undefined>(
    statusId: string,
    context?: T
  ) =>
    truthAPIv1Call<T extends undefined ? Truth : Truth[]>(
      `/statuses/${statusId}${!!context ? `/context/${context}` : ``}`,
      this.token
    )

  suggestions = async (limit: number = 50) =>
    truthAPIv2Call<TruthSuggestion[]>(`/suggestions?limit=${limit}`, this.token)

  timeline = async () => truthAPIv1Call<Truth[]>(`/timelines/home`, this.token)

  trends = async () => truthAPIv1Call<TruthTrend[]>(`/trends`, this.token)

  trendingTruths = async () =>
    truthAPIv1Call<Truth[]>(`/truth/trending/truths`, this.token)

  follow = async (accountId: string) =>
    truthAPIv1Call<TruthFollow>(
      `/accounts/${accountId}/follow`,
      this.token,
      `POST`
    )

  unfollow = async (accountId: string) =>
    truthAPIv1Call<TruthFollow>(
      `/accounts/${accountId}/unfollow`,
      this.token,
      `POST`
    )
}
