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

这一步无法用 token 或账号密码代劳，因为要微信扫码 + 实名认证：

1. **注册小程序账号**
   - 打开 https://mp.weixin.qq.com → 立即注册 → 小程序
   - 用一个**没注册过公众号/小程序**的邮箱（你给的 163 邮箱如果用过了，得换一个）
   - 完成邮箱验证 + 主体认证（个人主体免费，需身份证实名）

2. **拿到 AppID**
   - 登录 mp.weixin.qq.com → 开发管理 → 开发设置 → 复制 AppID

3. **把 AppID 发给我**
   - 我写进 `project.config.json`，你就不用手动改

4. **上传代码**
   - 微信开发者工具打开项目 → 点顶部「上传」→ 填版本号（如 1.0.0）
   - 这里需要你微信扫码确认

5. **提交审核**
   - 回到 mp.weixin.qq.com → 版本管理 → 开发版本 → 提交审核
   - 审核 1-7 天，通过后点「发布」

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
