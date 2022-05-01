import { TruthClient } from '../src/client'
import dotenv from 'dotenv'

dotenv.config()

const doScrape = async () => {
  const client = new TruthClient()
  const token = await client.login(
    process.env.TRUTH_USERNAME,
    process.env.TRUTH_PASSWORD
  )

  console.log(token)

  const account = await client.accountLookup('realDonaldTrump')
  console.log(account)

  const statuses = await client.accountStatuses(account.id)
  console.log(statuses)
}

doScrape().then()
