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

  const trends = await client.search('Trump', 'hashtags')
  console.log(JSON.stringify(trends, null, 2))
}

doScrape().then()
