import { TruthClient } from '../src/client'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const doScrape = async () => {
  const data = fs.readFileSync('./video.mp4')

  const client = new TruthClient()
  const token = await client.login(
    process.env.TRUTH_USERNAME,
    process.env.TRUTH_PASSWORD
  )

  console.log(token)

  const trends = await client.postMedia(data, 'video/mp4')
  const status = await client.postStatus('special message to the haters', [
    trends.id
  ])

  console.log(JSON.stringify(status, null, 2))
}

doScrape().then()
