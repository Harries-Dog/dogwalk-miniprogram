// 本地数据层。当前用 Storage 模拟，接后端时替换这里的实现即可。

const mock = require('./mock.js')

const KEY_TICKETS = 'dogwalk_tickets_v1'
const KEY_WALK = 'dogwalk_walk_v1'

let tickets = []
let walk = { active: false, startedAt: null }

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function read(key, fallback) {
  try {
    const value = wx.getStorageSync(key)
    if (value === undefined || value === null || value === '') return clone(fallback)
    return value
  } catch (e) {
    return clone(fallback)
  }
}

function write(key, value) {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    // 存储失败不影响演示流程
  }
}

function saveTickets() { write(KEY_TICKETS, tickets) }
function saveWalk() { write(KEY_WALK, walk) }

function init() {
  tickets = read(KEY_TICKETS, mock.INITIAL_TICKETS)
  walk = read(KEY_WALK, walk)
}

function getTickets() { return tickets }

function nextId() {
  let max = 420
  tickets.forEach(function (t) {
    const n = parseInt(String(t.id).replace(/\D/g, ''), 10)
    if (!isNaN(n) && n > max) max = n
  })
  return 'LD-0' + (max + 1)
}

function addTicket(data) {
  const ticket = {
    id: nextId(),
    type: data.type,
    area: data.area,
    behaviors: data.behaviors.slice(),
    time: '刚刚',
    status: 'new'
  }
  tickets.unshift(ticket)
  saveTickets()
  return ticket
}

function updateTicket(id, patch) {
  let found = null
  tickets.forEach(function (t) {
    if (t.id === id) {
      Object.keys(patch).forEach(function (k) { t[k] = patch[k] })
      found = t
    }
  })
  if (found) saveTickets()
  return found
}

function getWalk() { return walk }

function setWalk(patch) {
  Object.keys(patch).forEach(function (k) { walk[k] = patch[k] })
  saveWalk()
  return walk
}

function reset() {
  tickets = clone(mock.INITIAL_TICKETS)
  walk = { active: false, startedAt: null }
  saveTickets()
  saveWalk()
}

module.exports = {
  init,
  getTickets,
  addTicket,
  updateTicket,
  getWalk,
  setWalk,
  reset
}
