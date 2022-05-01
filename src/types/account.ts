export interface TruthAccountSource {
  privacy: string
  sensitive: boolean
  language: string
  email: string
  approved: boolean
  note: string
  fields: any[]
  unapproved_position: number
  sms_verified: boolean
  ready_by_sms_verification: boolean
  follow_requests_count: number
}

export interface TruthAccountPleroma {
  settings_store: {}
  is_admin: boolean
  is_moderator: boolean
}

export interface TruthAccount {
  id: string
  username: string
  acct: string
  display_name: string
  locked: boolean
  bot: false
  discoverable: boolean
  group: boolean
  created_at: string // '2022-04-30T00:00:00.000Z'
  note: string
  url: string
  avatar: string
  avatar_static: string
  header: string
  header_static: string
  followers_count: number
  following_count: number
  statuses_count: number
  last_status_at: string // yyyy-mm-dd
  verified: boolean
  location: string
  website: string
  emojis: any[]
  fields: any[]
}

export interface TruthAccountVerification extends TruthAccount {
  source: TruthAccountSource
  pleroma: TruthAccountPleroma
}
