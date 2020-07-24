const mysql = require('mysql')

/**
 *  Create db and table on initialization
 *
 */

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
})

db.connect(async (err) => {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  } else {
    createDB()
    await useDB()
    initDB()
    console.log('conected to db')
  }
})

const createDB = () => {
  const sql = 'CREATE DATABASE IF NOT EXISTS mytwittercollector;'
  db.query(sql, (err, res) => {
    if (err) console.error(err)
  })
}

const useDB = () => {
  return new Promise((resolve, reject) => {
    const sql = 'USE mytwittercollector;'
    db.query(sql, (err, res) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

const initDB = () => {
  // create tables
  // users
  let sql = `CREATE TABLE IF NOT EXISTS person(
      screen_name VARCHAR(255) PRIMARY KEY, 
      id BIGINT UNSIGNED NOT NULL UNIQUE
    );`

  db.query(sql, (err, res) => {
    err && console.error(err)
  })
  // tweets
  sql = `CREATE TABLE IF NOT EXISTS tweet(
      id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
      text TEXT,
      retweet INT UNSIGNED,
      created_at DATE,
      favorite_count INT UNSIGNED DEFAULT 0, 
      user_screen_name VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_screen_name) REFERENCES person(screen_name)
    );`
  db.query(sql, (err, res) => {
    err && console.error(err)
  })
  // user info
  sql = `CREATE TABLE IF NOT EXISTS daily_user_info(
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  followers INT UNSIGNED,
  date DATE NOT NULL DEFAULT now(),
  user_screen_name  VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_screen_name) REFERENCES person(screen_name)
);`
  db.query(sql, (err, res) => {
    if (err) console.error(err)
  })
}

module.exports = db
