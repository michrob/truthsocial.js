import { TruthAccount } from './account'
import { Truth } from './status'
import { TruthTrend } from './trend'

export type TruthSearchType = 'accounts' | 'statuses' | 'hashtags'

export interface TruthSearchResults {
  accounts: TruthAccount[]
  statuses: Truth[]
  hashtags: TruthTrend[]
}
