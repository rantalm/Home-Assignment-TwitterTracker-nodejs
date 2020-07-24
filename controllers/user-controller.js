const { addUser } = require('../models/add-user')
const { isUserExists } = require('../models/db-utils')
const fetchUserData = require('./fetch-user-data')
const updateUserInfo = require('../models/update-user-info')

/**
 * Add user if not exists
 * @param {String} screenName
 * @param {Boolean} returnData  if falsy return Boolean insted of the data object
 */

exports.addUserController = async (screenName, returnData) => {
  if (!screenName || typeof screenName !== 'string') throw new Error('screen name not valid')
  let userExists = await isUserExists(screenName)
  userExists = userExists.length

  if (userExists) {
    await this.updateUserInfoController(screenName)
    return true
  }

  try {
    const userData = await fetchUserData(screenName)
    await addUser({ id: userData[0].id, screen_name: userData[0].screen_name })
    await this.updateUserInfoController(screenName, userData)
    return returnData ? userData : true
  } catch (err) {
    console.error('addUserController::', err)
    return false
  }
}

/**
 * update user data to the current day
 * @param {String} screenName
 * @param {Object} userData
 */
exports.updateUserInfoController = async (screenName, userData = null) => {
  if (!userData) {
    userData = await fetchUserData(screenName)
    if (!userData) return false
  }

  const result = await updateUserInfo(userData)
}
