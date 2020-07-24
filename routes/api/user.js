const express = require('express')
const { addUserController } = require('../../controllers/user-controller.js')
const { toISOStringLocal } = require('../../util')
const db = require('../../models/db-init')
const tweetsController = require('../../controllers/tweets-controller')
const getUserInfo = require('../../models/get-user-info')

/**
 * user router, root of user handlers
 */

const router = express.Router()

/**
 *  cad get start and end params
 *  dates shuld be formated as 'YYYY-MM-DD'
 *
 *  will return every user data (only) for the current day
 */

router.route('/:screenName').get(async (req, res) => {
  const start = req.query.start ? req.query.start : toISOStringLocal(new Date())
  const end = req.query.end ? req.query.end : toISOStringLocal(new Date())
  const { screenName } = req.params

  try {
    const userAddedOrExists = await addUserController(screenName)
    if (!userAddedOrExists) {
      return res.json({ msg: 'no such user' })
    }
    const t = await tweetsController(screenName)
    const userInfo = await getUserInfo(screenName, start, end)
    return res.json(userInfo)
  } catch (err) {}
  return res.json({ msg: 'try again' })
})

router.route('/').get(async (req, res) => {
  const userInfo = await getUserInfo()
  return res.json(userInfo)
})

module.exports = router
