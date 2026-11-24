# 发布到 GitHub + 发布微信小程序

代码已经准备好了：git 仓库初始化完成、初始提交已做、`.gitignore` 排除了个人配置。**只差把代码推上去**。

当前状态：
- 本地仓库：已就绪（`ea582d2` 这一次提交，27 个文件）
- GitHub 账号：`Harries-Dog`（你给的 token 验证通过，用户名就是这个）
- 目标仓库：`https://github.com/Harries-Dog/dogwalk-miniprogram`
- remote：已配好

卡住的地方：你给的 token 权限不够——能读用户信息，但**不能创建仓库**（fine-grained token 没勾对应权限）。

---

## 第一步：修 token 权限（或新建 token）

1. 打开 https://github.com/settings/personal-access-tokens
2. 找到你这枚 token，点进去编辑，勾选这些权限：
   - **Administration: Read and write**（创建仓库需要）
   - **Contents: Read and write**（推送代码需要）
   - **Metadata: Read**（默认就有）
3. 如果找不到编辑入口，就重新生成一个：
   - https://github.com/settings/personal-access-tokens/new
   - Resource owner：选 `Harries-Dog`
   - Repository access：**All repositories**
   - Permissions 加上上面三项
   - 生成后复制新 token

⚠️ 新 token 发给我，我来完成创建仓库 + 推送。旧的那枚我已经不会再用。

---

## 第二步：我来做的事

拿到有权限的 token 后，我会：

1. 创建公开仓库 `dogwalk-miniprogram`
2. 推送本地代码（`git push -u origin main`）
3. 给你仓库地址：`https://github.com/Harries-Dog/dogwalk-miniprogram`

---

## 第三步：发布到微信小程序（必须你本人操作）

✅ **已完成**：小程序账号注册、AppID 获取、AppID 写入 `project.config.json`、代码同步到 GitHub。

这一步无法用 token 或账号密码代劳，因为要**微信扫码**：

1. **重新导入项目**（关键）
   - 微信开发者工具 → 关闭当前项目 → 重新导入 `遛狗小程序` 文件夹
   - 因为 AppID 变了，必须重新导入才会生效
   - 导入后顶部显示的应该是你的小程序名，不再是「测试号」

2. **上传代码**
   - 点工具顶部「**上传**」按钮
   - 版本号填 `1.0.0`，备注填「首版：遛狗地图与流浪狗共治」
   - 微信扫码确认

3. **提交审核**
   - 回到 mp.weixin.qq.com → 管理 → 版本管理 → 开发版本
   - 找到刚上传的版本 → 点「**提交审核**」
   - 按提示填功能页面（选 `pages/map/map` 作为首页）和类目
   - 审核 1-7 天，通过后点「发布」

4. **发布的两种进入方式**
   - 审核通过后，在 mp 后台「小程序码」下载小程序码，贴到小区公告栏
   - 或者用户微信搜索你的小程序名字进入

⚠️ **AppSecret 警告**：你提供过一串 `495b...` 开头的 AppSecret。它**没有**写进任何文件，也**不需要**（当前是纯本地数据版）。但因为它已经在聊天中暴露，建议你去 mp 后台 → 开发管理 → 开发设置 → AppSecret → **重置**，作废旧的。以后如果接后端，AppSecret 只能放服务器端环境变量，绝不能写进小程序代码。

---

## 关于「外网访问地址」

小程序**没有网址**，用户通过三种方式进入：
- 微信搜小程序名字
- 扫描小程序码
- 朋友分享卡片

如果你要的是「一个能点开就用的链接」，那是网页版（昨天做的那个），两者是不同产品。

等你确认要哪种，我再决定把精力放哪边。

---

## 隐私说明

- 你发来的邮箱/密码/token **没有写入任何文件、git 配置或持久化存储**
- token 只在当前这次会话的内存里用于调用 GitHub API
- 建议你在 GitHub 设置里**作废这枚权限不足的旧 token**，重新生成一枚权限正确的
