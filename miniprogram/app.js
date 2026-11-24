App({
  globalData: {
    community: '阳光花园 · 3 期',
    version: '0.1.0'
  },
  onLaunch() {
    const store = require('./utils/store.js')
    store.init()
  }
})
