const moment = require('moment')
const db = require('./db-init.js')
const { getAllUsers, populateUser } = require('./db-utils')
const { getDatesArrayFromRange, formatTweetsDate, toISOStringLocal } = require('../util.js')

/**
 * @param {string} screenName
 * @param {string} start
 * @param {string} end
 *
 * @returns {Promise} wuth users data to disolay
 *
 * Date format must be YYYY-MM-DD
 */

const getUserInfo = (
  screenName = [],
  start = toISOStringLocal(new Date()),
  end = toISOStringLocal(new Date())
) => {
  // screenName and dates format validation
  if (typeof screenName === 'string') {
    screenName = [screenName]
  }

  if (!moment(start, 'YYYY-MM-DD', true).isValid() || !moment(end, 'YYYY-MM-DD', true).isValid()) {
    start = toISOStringLocal(new Date())
    end = toISOStringLocal(new Date())
  }

  return new Promise(async (resolve, reject) => {
    const dates = getDatesArrayFromRange(start, end)

    try {
      const users = screenName.length ? [{ screen_name: screenName[0] }] : await getAllUsers()

      const usersData = []
      for (let i = 0; i < users.length; i++) {
        user = await populateUser(users[i], start, end)
        usersData.push(user)
      }
      resolve(usersData)
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}

module.exports = getUserInfo
