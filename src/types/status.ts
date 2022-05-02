import { TruthAccount } from './account'

export interface TruthTag {
  name: string
  url: string
}

export type TruthMediaType = 'image' | 'video'

export interface TruthMediaAttachmentMeta {
  width: number
  height: number
  size: string // XxY
  aspect: number
}

export interface TruthMediaAttachment {
  id: string
  type: TruthMediaType
  url: string
  preview_url: string
  external_video_id: null
  remote_url: null
  preview_remote_url: null
  text_url: string
  meta: {
    original: TruthMediaAttachmentMeta
    small: TruthMediaAttachmentMeta
  }
  description: string
  blurhash: string
}

type TruthCardType = 'image' | 'video' | 'link'

export interface TruthCard {
  url: string
  title: string
  description: string
  type: TruthCardType
  author_name: string
  author_url: string
  provider_name: string
  provider_url: string
  html: string
  width: number
  height: number
  image: string
  embed_url: string
  blurhash: string
}

export interface TruthMention {
  id: string
  username: string
  url: string
  acct: string
}

export interface Truth {
  id: string
  created_at: string // '2022-04-28T19:21:33.741Z'
  in_reply_to_id: null
  in_reply_to_account_id: null
  sensitive: boolean
  spoiler_text: string
  visibility: string
  language: string
  uri: string
  url: string
  replies_count: number
  reblogs_count: number
  favourites_count: number
  favourited: boolean
  reblogged: boolean
  muted: boolean
  bookmarked: boolean
  content: string
  reblog: Truth
  account: TruthAccount
  media_attachments: TruthMediaAttachment[]
  mentions: TruthMention[]
  tags: TruthTag[]
  emojis: []
  card: TruthCard
  poll: null
}
