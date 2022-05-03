export interface TruthRelationship {
  id: string
  following: boolean
  showing_reblogs: boolean
  notifying: boolean
  followed_by: boolean
  blocking: boolean
  blocked_by: boolean
  muting: boolean
  muting_notifications: boolean
  requested: boolean
  domain_blocking: boolean
  endorsed: boolean
  note: string
}
