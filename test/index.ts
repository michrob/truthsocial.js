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

  const trends = await client.updateAccount({
    displayName: 'My Name',
    location: 'The internet',
    website: 'https://www.npmjs.com/package/truthsocial.js',
    bio: 'My bio',
    avatar: {
      mimetype: 'image/jpg',
      data: data
    },
    header: {
      mimetype: 'image/jpg',
      data: data
    }
  })
  // const status = await client.postStatus('special message to the haters', [
  //   trends.id
  // ])

  console.log(JSON.stringify(trends, null, 2))
}

doScrape().then()
