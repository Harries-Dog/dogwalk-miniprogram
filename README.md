# 遛遛 · 微信小程序（V0.1 演示版）

遛狗安全与社区共治小程序的第一个可运行版本。基于 PRD V0.2 的 MVP 范围：附近狗地图、兼容度预警、一键 SOS、流浪狗上报（双路径）、物业工单闭环。

## 如何运行

1. 打开**微信开发者工具** → 导入项目
2. 目录选择本文件夹 `遛狗小程序`（不是里面的 `miniprogram`）
3. AppID 选择「测试号」即可（`project.config.json` 已填 `touristappid`）
4. 点击编译，可在模拟器里完整点击体验

不需要后端、不需要 npm install、不需要配地图 key。地图是离线绘制的演示画布。

## 四个页面

| 页面 | 路径 | 能做什么 |
|---|---|---|
| 地图 | `pages/map` | 开始/结束遛狗、附近狗点位、红黄绿兼容度、筛选、狗详情、SOS、一键目击入口 |
| 上报 | `pages/report` | 一键目击（3 秒）、四步详细上报、提交生成工单 |
| 物业 | `pages/admin` | 工单统计、筛选、认领、指派巡逻、闭环回写、月度公示 |
| 我的 | `pages/profile` | 我的狗档案、隐私说明、重置演示数据 |

## 建议的体验顺序

1. 地图页 → 点「小鹿 / 阿黄 / 大壮」，看三种兼容度判定和理由
2. 点右上角「结束遛狗」，看位置关闭后的状态
3. 点「SOS」，选任意求助类型
4. 点「一键目击」→ 确认上报 → 自动跳到物业端
5. 物业端点工单 → 认领 → 指派巡逻 → 标记已处置
6. 回到「我的」→ 重置演示数据

## 数据边界（重要）

当前所有数据都是**模拟数据**：

- 狗、流浪狗活动区：写在 `miniprogram/utils/mock.js`
- 兼容度规则：写在 `miniprogram/utils/compatibility.js`
- 工单与遛狗会话：用 `wx.setStorageSync` 存在本机，刷新页面不会丢，卸载小程序或点「重置」会恢复初始状态
- 地图是 CSS 画的示意画布，点位坐标是百分比，不对应真实地理位置

## 接后端时改哪里

| 当前实现 | 替换成 |
|---|---|
| `utils/mock.js` 的 `DOGS` | `GET /nearby-dogs` 接口，返回狗档案 + 模糊化后的坐标 |
| `utils/compatibility.js` | 可以保留在客户端做初判，服务端再算一遍做校验 |
| `utils/store.js` 的 `addTicket` / `updateTicket` | `POST /stray-reports` / `PATCH /stray-reports/:id` |
| `utils/store.js` 的 `setWalk` | 遛狗会话服务，服务端控制 TTL（结束后 5 分钟失效） |
| `pages/map/map.js` 的 `wx.getLocation` | 已接好真实定位调用，失败时回退演示位置；接后端后把坐标上报即可 |
| 物业 tab | 生产环境应拆成独立小程序或独立登录态，当前只是演示 |

## 产品边界（PRD V0.2）

- 不做"危险流浪狗"标签：只记录观察到的行为和处置状态，定性归主管部门
- 位置默认关闭、地图模糊 80–150m、流浪狗只显示区域不显示实时点位
- 物业看不到居民的遛狗会话和狗档案
- V1 不做 TNR / 领养 / 付费代遛 / 社交游戏

## 目录结构

```
遛狗小程序/
├── project.config.json
├── README.md
└── miniprogram/
    ├── app.js / app.json / app.wxss
    ├── sitemap.json
    ├── utils/
    │   ├── mock.js            演示数据
    │   ├── compatibility.js   兼容度规则引擎
    │   └── store.js           本地数据层（Storage）
    └── pages/
        ├── map/               地图页
        ├── report/            上报页
        ├── admin/             物业工单页
        └── profile/           我的
```
