const twitClient = require('./twit.js')
const { getLastTweetId } = require('../models/db-utils')

/**
 * fetch if there new tweets and only from the last one saved
 * @param {String} screenName
 * @returns {Promis} with tweets array
 */
const fetchTweets = async (screenName) => {
  if (!screenName || typeof screenName !== 'string') throw new Error('screen name not valid')
  // get last tweet
  let lastTweetId = await getLastTweetId(screenName)
  lastTweetId = lastTweetId.length ? lastTweetId[0].id : 1
  return new Promise((resolve, reject) => {
    twitClient.get(
      '/statuses/user_timeline',
      {
        screen_name: screenName,
        count: 20,
        include_rts: true,
        include_entities: true,
        since_id: lastTweetId,
      },
      function (err, data, response) {
        if (err) {
          console.error('fetchTweets error::', err)
          reject(err)
          return false
        }
        if (data) {
          resolve(data)
        }
      }
    )
  })
}
module.exports = fetchTweets
