const mock = require('../../utils/mock.js')
const compat = require('../../utils/compatibility.js')
const store = require('../../utils/store.js')

Page({
  data: {
    community: '',
    walking: false,
    dogCount: mock.DOGS.length,
    filters: [
      { key: 'all', label: '全部', on: true },
      { key: 'green', label: '可接触', on: false },
      { key: 'amber', label: '先观察', on: false },
      { key: 'red', label: '保持距离', on: false },
      { key: 'stray', label: '流浪狗', on: false }
    ],
    pins: [],
    rows: [],
    stray: mock.STRAY_AREA,
    showStray: true,
    showDetail: false,
    detail: {},
    showStrayDetail: false,
    showSos: false,
    sosOptions: [
      { key: '打架', label: '狗打架' },
      { key: '走失', label: '狗走失' },
      { key: '医疗', label: '医疗急救' },
      { key: '流浪狗', label: '流浪狗正在攻击' }
    ]
  },

  filterKey: 'all',

  onLoad() {
    this.refresh()
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const walk = store.getWalk()
    const pins = mock.DOGS.map(function (d) {
      const r = compat.evaluate(mock.MY_DOG, d)
      return {
        id: d.id,
        name: d.name,
        avatar: d.avatar || d.name.slice(0, 1),
        level: r.level,
        left: d.left,
        top: d.top,
        visible: true
      }
    })
    const rows = mock.DOGS.map(function (d) {
      const r = compat.evaluate(mock.MY_DOG, d)
      return {
        id: d.id,
        name: d.name,
        avatar: d.avatar || d.name.slice(0, 1),
        level: r.level,
        label: r.label,
        desc: d.breed + ' · ' + d.size + ' 型 · ' + (d.neutered ? '已绝育' : '未绝育'),
        visible: true
      }
    })
    this.setData({
      community: getApp().globalData.community,
      walking: walk.active,
      pins: pins,
      rows: rows
    })
    this.applyFilter(this.filterKey, false)
  },

  applyFilter(key, updateChips) {
    const filters = updateChips
      ? this.data.filters.map(function (f) {
          return { key: f.key, label: f.label, on: f.key === key }
        })
      : this.data.filters
    const pins = this.data.pins.map(function (p) {
      return Object.assign({}, p, { visible: key === 'all' || p.level === key })
    })
    const rows = this.data.rows.map(function (p) {
      return Object.assign({}, p, { visible: key === 'all' || p.level === key })
    })
    this.setData({
      filters: filters,
      pins: pins,
      rows: rows,
      showStray: key === 'all' || key === 'stray'
    })
  },

  onFilter(e) {
    const key = e.currentTarget.dataset.key
    this.filterKey = key
    this.applyFilter(key, true)
  },

  onToggleWalk() {
    if (this.data.walking) {
      store.setWalk({ active: false, startedAt: null })
      wx.showToast({ title: '遛狗已结束 · 位置立即失效', icon: 'none' })
      this.refresh()
      return
    }

    const finish = () => {
      store.setWalk({ active: true, startedAt: Date.now() })
      wx.showToast({ title: '遛狗已开始 · 位置临时共享', icon: 'none' })
      this.refresh()
    }

    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        store.setWalk({ latitude: res.latitude, longitude: res.longitude })
        finish()
      },
      fail: () => {
        wx.showToast({ title: '未获取到定位，已用演示位置', icon: 'none' })
        finish()
      }
    })
  },

  onDogTap(e) {
    const id = e.currentTarget.dataset.id
    const dog = mock.DOGS.filter(function (d) { return d.id === id })[0]
    if (!dog) return
    const r = compat.evaluate(mock.MY_DOG, dog)
    this.setData({
      showDetail: true,
      detail: {
        name: dog.name,
        breed: dog.breed,
        size: dog.size,
        distance: dog.distance,
        direction: dog.direction,
        level: r.level,
        label: r.label,
        reason: r.reason,
        tags: compat.describe(dog)
      }
    })
  },

  onStrayTap() {
    this.setData({ showStrayDetail: true })
  },

  onSos() {
    this.setData({ showSos: true })
  },

  onSosType(e) {
    const key = e.currentTarget.dataset.key
    const option = this.data.sosOptions.filter(function (o) { return o.key === key })[0]
    this.onCloseModal()
    wx.showToast({
      title: (option ? option.label : key) + '：广播已发出',
      icon: 'none'
    })
  },

  onGreet() {
    this.onCloseModal()
    wx.showToast({ title: '已打招呼 · 对方接受后共享精确位置', icon: 'none' })
  },

  onQuickReport() {
    getApp().globalData.pendingQuickReport = true
    wx.switchTab({ url: '/pages/report/report' })
  },

  onCloseModal() {
    this.setData({ showDetail: false, showStrayDetail: false, showSos: false })
  },

  noop() {}
})
