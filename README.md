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

// Given an accounId, responds with the public fields associated with the account.
const publicAccount = await client.account('107780257626128497')

// Given an accountId, responds with a list of statuses.
// This method takes an optional boolean parameter that specifies
// whether status replies should be excluded.
const statuses = await client.accountStatuses(publicAccount.id)

// Lookup an account given a username.
const lookedUp = await client.accountLookup('realDonaldTrump')

// Given a statusId, responds with the status details.
const status = await client.status('107797156496908384')

// Loads trending hashtags with trailing week stats.
const trends = await client.trends()

// Given an accountId, follows that user.
const follow = await client.follow('107780257626128497')

// Given an accountId, unfollows that user.
const unfollow = await client.unfollow('108137954681674690')
```




