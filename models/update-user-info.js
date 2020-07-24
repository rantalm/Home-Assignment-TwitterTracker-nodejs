const db = require('./db-init')
const moment = require('moment')
const { toISOStringLocal } = require('../util')

/**
 * @param {Array} userData
 * }
 */

const updateUserInfo = (userData) => {
  const followers = db.escape(userData[0].followers_count)
  const screenName = db.escape(userData[0].screen_name)
  const date = "'" + toISOStringLocal(new Date()) + "'"

  let sqlInsert = `INSERT INTO daily_user_info (followers, user_screen_name)
                VALUES (${followers}, ${screenName});`

  let sqlSelect = `SELECT * FROM daily_user_info WHERE user_screen_name = ${screenName} AND date = ${date};`
  db.query(sqlSelect, (err, res) => {
    if (err) {
      console.error(err)
      return false
    }
    if (res && res.length === 0) {
      db.query(sqlInsert, (err, res) => {
        if (err) {
          console.error(err)
          return false
        }
        return true
      })
    }
  })
}

module.exports = updateUserInfo
