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

  const follow = await client.follow('107780257626128497')
  console.log(follow)
}

doScrape().then()
