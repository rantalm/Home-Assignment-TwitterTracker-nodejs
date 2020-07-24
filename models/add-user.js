const db = require('./db-init.js')

/**
 *
 * @param {Object} user
 */

exports.addUser = async (user) => {
  if (
    !user.id ||
    !user.screen_name ||
    typeof user.id !== 'number' ||
    typeof user.screen_name !== 'string'
  )
    throw new Error('not valid user object')

  try {
    const exist = await isUserExists(user)
    if (!exist) {
      let sql = `INSERT INTO person SET ?`
      db.query(sql, user, (err, res) => {
        if (err) {
          console.error('addUsererr', err)
          return false
        }
        return true
      })
    }
  } catch (err) {
    console.error(err)
  }
}

function isUserExists(user) {
  let sql = `SELECT * FROM person WHERE screen_name = ${db.escape(user.screen_name)};`
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res.length)
    })
  })
}
