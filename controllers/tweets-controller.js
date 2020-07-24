const fetchTweets = require('./fetch-tweets')
const addTweets = require('../models/add-tweets')
const { formatTweetsDate } = require('../util')

/**
 * @param {String} screenName
 * send to db handler from fetch handler
 */
const tweetsController = async (screenName) => {
  const tweets = await fetchTweets(screenName)
  if (!tweets || tweets.length === 0) {
    console.warn('no tweets found')
    return false
  }

  // insert tweets to db
  const newTweetsArr = []
  for (let i = 0; i < tweets.length; i++) {
    let newTweetElement = [
      tweets[i].id,
      tweets[i].text,
      tweets[i].retweet_count,
      formatTweetsDate(tweets[i].created_at),
      tweets[i].favorite_count,
      tweets[i].user.screen_name,
    ]
    newTweetsArr.push(newTweetElement)
  }

  const result = await addTweets(newTweetsArr)
}

module.exports = tweetsController
