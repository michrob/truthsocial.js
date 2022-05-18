import { TruthAccount } from './account'
import { Truth } from './status'

interface TruthNotificationBase {
  account: TruthAccount
  created_at: string
  id: string
}

interface TruthFollowNotification extends TruthNotificationBase {
  type: `follow`
}

interface TruthNonFollowNotification extends TruthNotificationBase {
  type: `mention` | `reblog` | `favourite`
  status: Truth
}

export type TruthNotification =
  | TruthNonFollowNotification
  | TruthFollowNotification

export type TruthNotificationType = TruthNotification['type']
