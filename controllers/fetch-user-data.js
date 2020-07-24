const twitClient = require('./twit.js')

/**
 * fetch if there new tweets and only from the last one saved
 * @param {String} screenName
 */

const fetchUserData = async (screenName) => {
  if (!screenName || typeof screenName !== 'string') throw new Error('screen name not valid')

  return new Promise((resolve, reject) => {
    twitClient.get('/users/lookup', { screen_name: screenName }, function (err, data, response) {
      if (err) {
        console.error('fetchUserData error::', err)
        reject(err)
        return false
      }
      if (data) {
        resolve(data)
      }
    })
  })
}
module.exports = fetchUserData
