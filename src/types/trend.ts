export interface TruthTrendStat {
  day: string
  uses: string
  accounts: string
}

export interface TruthTrend {
  name: string
  url: string
  history: TruthTrendStat[]
}
