// 演示数据。接后端时，把这里的导出替换成接口返回即可。

const MY_DOG = {
  id: 'me',
  name: '豆豆',
  breed: '柯基',
  size: 'S',
  gender: '女',
  neutered: true,
  temperament: ['friendly'],
  vaccinated: true,
  inHeat: false,
  sick: false,
  onLeash: true,
  mood: '正常'
}

const DOGS = [
  {
    id: 'd1',
    name: '元大宝',
    avatar: '大',
    breed: '柯基',
    size: 'S',
    gender: '女',
    neutered: true,
    temperament: ['friendly'],
    vaccinated: true,
    inHeat: false,
    sick: false,
    onLeash: true,
    mood: '正常',
    distance: 120,
    direction: '西北',
    left: 28,
    top: 46
  },
  {
    id: 'd2',
    name: '元二宝',
    avatar: '二',
    breed: '金毛',
    size: 'L',
    gender: '男',
    neutered: false,
    temperament: ['high_energy'],
    vaccinated: true,
    inHeat: false,
    sick: false,
    onLeash: true,
    mood: '正常',
    distance: 260,
    direction: '东北',
    left: 80,
    top: 22
  },
  {
    id: 'd3',
    name: '元宝叔',
    avatar: '叔',
    breed: '德牧',
    size: 'L',
    gender: '男',
    neutered: true,
    temperament: ['dog_reactive'],
    vaccinated: true,
    inHeat: false,
    sick: false,
    onLeash: true,
    mood: '情绪差',
    distance: 180,
    direction: '东南',
    left: 62,
    top: 88
  },
  {
    id: 'd4',
    name: '天源',
    avatar: '源',
    breed: '泰迪',
    size: 'M',
    gender: '女',
    neutered: true,
    temperament: ['friendly'],
    vaccinated: true,
    inHeat: false,
    sick: false,
    onLeash: true,
    mood: '正常',
    distance: 310,
    direction: '正西',
    left: 12,
    top: 62
  }
]

const STRAY_AREA = {
  id: 's1',
  name: '流浪狗活动区',
  lastSeen: '2 小时前',
  behavior: '追逐行人',
  status: '物业处理中',
  left: 40,
  top: 76
}

const INITIAL_TICKETS = [
  {
    id: 'LD-0418',
    type: '行为观察',
    area: '泾康花园',
    behaviors: ['追逐行人'],
    time: '今天 16:42',
    status: 'new'
  },
  {
    id: 'LD-0417',
    type: '求助',
    area: '东门垃圾站旁',
    behaviors: ['靠近人'],
    time: '今天 15:10',
    status: 'new'
  },
  {
    id: 'LD-0415',
    type: '目击',
    area: '3 号楼后侧',
    behaviors: [],
    time: '今天 11:26',
    status: 'doing'
  },
  {
    id: 'LD-0412',
    type: '行为观察',
    area: '地下车库入口',
    behaviors: ['吠叫'],
    time: '昨天 19:03',
    status: 'done'
  }
]

const BEHAVIORS = ['吠叫', '追逐行人', '追逐狗', '护食', '靠近人', '攻击行为']

const AREAS = ['东门垃圾站旁', '3 号楼后侧', '泾康花园', '地下车库入口']

const CURRENT_AREA = '当前位置 · 阳光花园 3 期'

module.exports = {
  MY_DOG,
  DOGS,
  STRAY_AREA,
  INITIAL_TICKETS,
  BEHAVIORS,
  AREAS,
  CURRENT_AREA
}
