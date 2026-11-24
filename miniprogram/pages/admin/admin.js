const store = require('../../utils/store.js')

const STATUS = {
  new: { label: '待认领', cls: 'r' },
  doing: { label: '处理中', cls: 'y' },
  done: { label: '已闭环', cls: 'g' }
}

Page({
  data: {
    tickets: [],
    filteredTickets: [],
    filters: [
      { key: 'all', label: '全部', on: true },
      { key: 'new', label: '待认领', on: false },
      { key: 'doing', label: '处理中', on: false },
      { key: 'done', label: '已闭环', on: false }
    ],
    newCount: 0,
    doingCount: 0,
    doneCount: 0,
    totalCount: 0,
    showDetail: false,
    current: {},
    showSummary: false
  },

  filterKey: 'all',
  currentId: '',

  onShow() {
    this.refresh()
  },

  refresh() {
    const tickets = store.getTickets()
    const view = tickets.map(function (t) {
      const s = STATUS[t.status] || STATUS.new
      return Object.assign({}, t, {
        statusLabel: s.label,
        statusClass: s.cls,
        behaviorText: t.behaviors.length ? '观察行为：' + t.behaviors.join('、') : '位置与照片登记'
      })
    })
    const newCount = tickets.filter(function (t) { return t.status === 'new' }).length
    const doingCount = tickets.filter(function (t) { return t.status === 'doing' }).length
    const doneCount = tickets.filter(function (t) { return t.status === 'done' }).length
    this.setData({
      tickets: view,
      newCount: newCount,
      doingCount: doingCount,
      doneCount: doneCount,
      totalCount: tickets.length
    })
    this.applyFilter(this.filterKey, false)
  },

  applyFilter(key, updateChips) {
    const filters = updateChips
      ? this.data.filters.map(function (f) {
          return { key: f.key, label: f.label, on: f.key === key }
        })
      : this.data.filters
    const filtered = this.data.tickets.filter(function (t) {
      return key === 'all' || t.status === key
    })
    this.setData({ filters: filters, filteredTickets: filtered })
  },

  onFilter(e) {
    const key = e.currentTarget.dataset.key
    this.filterKey = key
    this.applyFilter(key, true)
  },

  onFilterStat(e) {
    this.onFilter(e)
  },

  onTicket(e) {
    const id = e.currentTarget.dataset.id
    const ticket = this.data.tickets.filter(function (t) { return t.id === id })[0]
    if (!ticket) return
    this.currentId = id
    this.setData({ current: ticket, showDetail: true })
  },

  onClaim() {
    const current = this.data.current
    if (!current || current.status === 'done') return
    store.updateTicket(current.id, { status: 'doing' })
    this.onCloseModal()
    this.refresh()
    wx.showToast({
      title: current.status === 'new' ? '已认领 · 进入处理中' : '已指派巡逻',
      icon: 'none'
    })
  },

  onCloseTicket() {
    const current = this.data.current
    if (!current) return
    store.updateTicket(current.id, { status: 'done' })
    this.onCloseModal()
    this.refresh()
    wx.showToast({ title: '已闭环 · 结果回写居民端地图', icon: 'none' })
  },

  onSummary() {
    this.setData({ showSummary: true })
  },

  onCloseModal() {
    this.setData({ showDetail: false, showSummary: false })
  },

  noop() {}
})
