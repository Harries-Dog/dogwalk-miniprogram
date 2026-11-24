const mock = require('../../utils/mock.js')
const compat = require('../../utils/compatibility.js')
const store = require('../../utils/store.js')

Page({
  data: {
    dog: mock.MY_DOG,
    avatar: mock.MY_DOG.name.slice(0, 1),
    tags: compat.describe(mock.MY_DOG),
    version: getApp().globalData.version
  },

  onReset() {
    wx.showModal({
      title: '重置演示数据',
      content: '会清除本机的工单改动和遛狗会话状态，恢复初始演示数据。',
      confirmText: '重置',
      success: (res) => {
        if (!res.confirm) return
        store.reset()
        wx.showToast({ title: '已恢复初始演示数据', icon: 'none' })
      }
    })
  }
})
