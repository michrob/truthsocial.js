# truthsocial.js

An unofficial typescript client for accessing the [Truth Social](https://truthsocial.com/) API.

## Install

```
yarn add truthsocial.js
```

or 

```
npm install truthsocial.js
```

## API


```typescript
import { TruthClient } from 'truthsocial.js'
import fs from 'fs'

// Creates a client instance
const client = new TruthClient()

// Login to an account
const token = await client.login(
    process.env.TRUTH_USERNAME,
    process.env.TRUTH_PASSWORD
)

// Pass no parameters and get back the account information
// associated with the credentials from the login method.
// Note that unlike the client.account() call below,
// this response includes private fields such as email address.
const privateAccount = await client.verifyCredentials()

// Update account details including text and image fields.
// Returns the updated account.
const profilePic = fs.readFileSync('./image.jpg')
const updatedAccount = await client.updateAccount({
    displayName: 'My Name',
    location: 'The internet',
    website: 'https://www.npmjs.com/package/truthsocial.js',
    bio: 'My bio',
    avatar: {
      mimetype: 'image/jpg',
      data: profilePic
    },
    header: {
      mimetype: 'image/jpg',
      data: data
    }
})

// Given an accounId, responds with the public fields associated with the account.
const publicAccount = await client.account('107780257626128497')

// Given an accountId, responds with a list of statuses.
// This method takes an optional boolean parameter that specifies
// whether status replies should be excluded.
const statuses = await client.accountStatuses(publicAccount.id)

// Lookup an account given a username.
const lookedUp = await client.accountLookup('realDonaldTrump')

// Given a list of accountIds, responds with relationships towards your account,
// such as whether you are following or followed by them.
const relationships = await client.relationships(['107797156496908384'])

// Searches accounts, hashtags, statuses for the specified query.
const search = await client.status('TruthSocial', 'hashtags')

// Given a statusId, responds with the status details.
// Optionally you can pass `ancestors` or `descendants`
// and get back other Truths in the thread.
const status = await client.status('107797156496908384')

// Given a statusId, delete the status.
const deleted = await client.deleteStatus('107797156496908384')

// Post a status, given text.
const newStatus = await client.postStatus("Hello World!")

// Post a status, given text and an optional list of mediaId values.
// Note that in order to post videos or images, you must first call postMedia
// and pass the id's you get back.
const jpg = fs.readFileSync('./image.jpg')
const mp4 = fs.readFileSync('./video.mp4')
const newMedia1 = await client.postMedia(jpq, "image/jpeg")
const newMedia2 = await client.postMedia(mp4, "video/mp4")
const newStatusWithMedia = await client.postStatus("Hello Media!", [newMedia1.id, newMedia2.id])

// Load notifications
const notifications = await client.notifications()

// Mute an account.
const mute = await client.mute(`108137954681674690`)

// Unmute an account.
const unmute = await client.unmute(`108137954681674690`)

// Load the list of muted accounts.
const mutes = await client.mutes(`108137954681674690`)

// Block an account.
const blocked = await client.block(`108137954681674690`)

// Unblock an account.
const unblocked = await client.unblock(`108137954681674690`)

// Load the list of blocked accounts.
const blocks = await client.blocks(`108137954681674690`)

// Loads trending hashtags with trailing week stats.
const trends = await client.trends()

// Loads list of suggested accounts with an optional limit parameter.
const suggestions = await client.suggestions()

// Loads list of truths from your users home feed of followed accounts.
const timeline = await client.timeline()

// Given an accountId, follows that user.
const follow = await client.follow('107780257626128497')

// Given an accountId, unfollows that user.
const unfollow = await client.unfollow('108137954681674690')
```




