import { TruthClient } from '../src/client'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const doScrape = async () => {
  const data = fs.readFileSync('./tstest.jpg')

  const client = new TruthClient()
  const token = await client.login(
    process.env.TRUTH_USERNAME,
    process.env.TRUTH_PASSWORD
  )

  console.log(token)

  const status = await client.block(`108199274754651421`)

  console.log(JSON.stringify(status, null, 2))
}

doScrape().then()
