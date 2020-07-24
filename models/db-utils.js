const db = require('./db-init')

exports.isUserExists = async (screenName) => {
  if (typeof screenName !== 'string') throw new Error('screen name not valid')
  screenName = db.escape(screenName)
  const sql = `SELECT * FROM person WHERE screen_name = ${screenName}`
  const result = await makeQuery(sql)
  return result
}

exports.isUserHaveTwits = async (user) => {
  if (!user || !user.screen_name) throw new Error('user not valid')

  const sql = `SELECT * FROM tweet WHERE user_screen_name = ${db.escape(user.ascreen_name)}`
  const result = await makeQuery(sql)
  return result
}

exports.isUserInfoExistsForDay = async (screenName, date) => {
  const sql = `SELECT * FROM daily_user_info WHERE user_screen_name = ${db.escape(
    screenName
  )} AND date = ${db.escape(date)};`

  const result = await makeQuery(sql)
  return result
}

exports.getAllUsers = async () => {
  const sql = 'SELECT screen_name, id FROM person;'
  const result = await makeQuery(sql)
  return result
}

exports.getLastTweetId = async (screenName) => {
  const sql = `SELECT id FROM tweet WHERE user_screen_name = ${db.escape(
    screenName
  )} ORDER BY id DESC LIMIT 1;`
  const result = await makeQuery(sql)
  return result
}

exports.populateUser = async ({ screen_name }, start, end) => {
  //const userDates = await getUserDates(screenName)
  const sql = `SELECT d.user_screen_name as name, DATE_FORMAT(d.date, '%Y-%m-%d') AS date, d.followers, 
  (SELECT COUNT(*) FROM tweet WHERE created_at = d.date) AS daily_tweet_count, 
  (SELECT SUM(favorite_count) FROM tweet WHERE created_at = d.date AND user_screen_name = d.user_screen_name) AS daily_favorite_count
  FROM daily_user_info AS d 
  JOIN tweet ON d.user_screen_name = ${db.escape(screen_name)} AND
  tweet.user_screen_name = d.user_screen_name AND
  d.date BETWEEN ${db.escape(start)} AND ${db.escape(end)}
  GROUP BY d.date`

  const result = await makeQuery(sql)
  return result
}
const makeQuery = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return false
      }
      resolve(res)
    })
  })
}
