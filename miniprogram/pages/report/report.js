const mock = require('../../utils/mock.js')
const store = require('../../utils/store.js')

function freshBehaviors() {
  return mock.BEHAVIORS.map(function (v) { return { value: v, on: false } })
}

Page({
  data: {
    community: '',
    stepList: [1, 2, 3, 4],
    step: 1,
    types: [
      { key: '目击', label: '目击', desc: '看到流浪狗，仅登记位置与照片' },
      { key: '行为观察', label: '行为观察', desc: '吠叫、追逐、护食、靠近人' },
      { key: '求助', label: '求助', desc: '受伤、生病、幼犬需要救助' },
      { key: '紧急', label: '紧急', desc: '正在攻击人或狗，立即联动 SOS' }
    ],
    type: '',
    behaviors: freshBehaviors(),
    selectedBehaviors: [],
    areas: mock.AREAS,
    area: '',
    photoText: '＋ 添加照片（可选，最多 3 张）',
    lastTicket: {},
    behaviorText: '',
    showQuick: false,
    currentArea: mock.CURRENT_AREA
  },

  onLoad() {
    this.setData({ community: getApp().globalData.community })
  },

  onShow() {
    const app = getApp()
    this.setData({ community: app.globalData.community })
    if (app.globalData.pendingQuickReport) {
      app.globalData.pendingQuickReport = false
      this.setData({ showQuick: true })
    }
  },

  onType(e) {
    this.setData({ type: e.currentTarget.dataset.key })
  },

  onNext1() {
    if (!this.data.type) {
      wx.showToast({ title: '请先选择上报类型', icon: 'none' })
      return
    }
    this.setData({ step: 2 })
  },

  onPrev1() {
    this.setData({ step: 1 })
  },

  onBehavior(e) {
    const value = e.currentTarget.dataset.value
    let selected = this.data.selectedBehaviors.slice()
    const index = selected.indexOf(value)
    if (index >= 0) selected.splice(index, 1)
    else selected.push(value)
    const behaviors = this.data.behaviors.map(function (b) {
      return Object.assign({}, b, { on: selected.indexOf(b.value) >= 0 })
    })
    this.setData({ selectedBehaviors: selected, behaviors: behaviors })
  },

  onNext2() {
    this.setData({ step: 3 })
  },

  onPrev2() {
    this.setData({ step: 2 })
  },

  onArea(e) {
    this.setData({ area: e.currentTarget.dataset.value })
  },

  onPhoto() {
    this.setData({ photoText: '✓ 已添加照片 1 / 3（仅物业可见）' })
  },

  onNext3() {
    if (!this.data.area) {
      wx.showToast({ title: '请先选择一个区域', icon: 'none' })
      return
    }
    this.submit()
  },

  submit() {
    const ticket = store.addTicket({
      type: this.data.type,
      area: this.data.area,
      behaviors: this.data.selectedBehaviors
    })
    this.setData({
      step: 4,
      lastTicket: ticket,
      behaviorText: ticket.behaviors.length ? ticket.behaviors.join('、') : '未勾选'
    })
  },

  onQuick() {
    this.setData({ showQuick: true })
  },

  onCloseQuick() {
    this.setData({ showQuick: false })
  },

  onQuickConfirm() {
    const ticket = store.addTicket({
      type: '目击',
      area: mock.CURRENT_AREA,
      behaviors: []
    })
    this.setData({
      showQuick: false,
      step: 4,
      type: '目击',
      area: mock.CURRENT_AREA,
      selectedBehaviors: [],
      behaviors: freshBehaviors(),
      lastTicket: ticket,
      behaviorText: '未勾选'
    })
  },

  onQuickDetail() {
    this.setData({
      showQuick: false,
      step: 2,
      type: '目击',
      area: mock.CURRENT_AREA
    })
  },

  toAdmin() {
    wx.switchTab({ url: '/pages/admin/admin' })
  },

  onReset() {
    this.setData({
      step: 1,
      type: '',
      behaviors: freshBehaviors(),
      selectedBehaviors: [],
      area: '',
      photoText: '＋ 添加照片（可选，最多 3 张）',
      lastTicket: {},
      behaviorText: ''
    })
  },

  noop() {}
})
