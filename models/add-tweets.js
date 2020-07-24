const db = require('./db-init')

/**
 * @param {Array} tweets
 */

const addTweets = async (tweets) => {
  if (!tweets || !tweets.length) {
    console.warn('addTweets:: no tweets')
    return false
  }
  let sql = `INSERT IGNORE INTO tweet(id, text, retweet, created_at, favorite_count, user_screen_name) VALUES ?`
  db.query(sql, [tweets], (err, res) => {
    if (err) {
      console.error(err)
      return false
    }
  })
}

module.exports = addTweets
