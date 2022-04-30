import { TruthClient } from './client'
import dotenv from 'dotenv'

dotenv.config()

const doScrape = async () => {
  const client = new TruthClient()
  const token = await client.login(
    process.env.TRUTH_USERNAME,
    process.env.TRUTH_PASSWORD
  )

  console.log(token)

  const accountVerification = await client.verifyCredentials()
  console.log(accountVerification)

  const account = await client.account(accountVerification.id)
  console.log(account)
}

doScrape().then()
