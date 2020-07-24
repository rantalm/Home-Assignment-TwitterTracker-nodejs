const moment = require('moment')

exports.isPromise = (value) => {
  return value && value.then && typeof value.then === 'function'
}

exports.toISOStringLocal = (d) => {
  function z(n) {
    return (n < 10 ? '0' : '') + n
  }
  return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate())
}

exports.getDatesArrayFromRange = (start, end) => {
  start = start || this.toISOStringLocal(new Date())
  end = end || this.toISOStringLocal(new Date())

  let dates = []
  let currDate = moment(start)
  let lastDate = moment(end)

  if (start !== end) {
    do {
      dates.push(currDate.clone().format('YYYY-MM-DD'))
    } while (currDate.add(1, 'days').diff(lastDate) <= 0)
  }
  dates = dates.length ? dates : [start]

  return dates
}

exports.formatTweetsDate = (d) => {
  const n = new Date(d).toISOString()
  return moment(n).format('YYYY-MM-DD')
}
