# Yuntai 官网部署指南

将静态网站部署到 GitHub Pages 并绑定阿里云域名 `yuntai.tech` 的完整步骤。

---

## 一、前提准备

- [x] 已有 GitHub 账号
- [x] 已在阿里云购买域名 `yuntai.tech`
- [x] 本地已安装 Git（[下载地址](https://git-scm.com/downloads)）

---

## 二、GitHub 仓库创建

### 2.1 在 GitHub 上创建仓库

1. 打开 https://github.com/new
2. **Repository name** 填写：`yuntai-official-website`（或任意名称）
3. 选择 **Public**（GitHub Pages 免费版要求公开仓库）
4. **不要**勾选 "Add a README file"（本地已有文件）
5. 点击 **Create repository**

### 2.2 本地初始化并推送

打开终端，进入网站目录，执行以下命令：

```bash
# 进入项目目录
cd D:/NLP/yuntai_offical_website

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Yuntai official website with GrowBook page"

# 关联远程仓库（把 <你的用户名> 替换为你的 GitHub 用户名）
git remote add origin https://github.com/<你的用户名>/yuntai-official-website.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

---

## 三、开启 GitHub Pages

1. 打开仓库页面：`https://github.com/<你的用户名>/yuntai-official-website`
2. 点击顶部 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. **Source** 选择：`Deploy from a branch`
5. **Branch** 选择：`main`，文件夹选 `/ (root)`
6. 点击 **Save**

等待 1-2 分钟，GitHub 会自动部署。部署完成后会显示：

> Your site is live at `https://<你的用户名>.github.io/yuntai-official-website/`

先访问这个地址确认网站正常显示，再进行域名绑定。

---

## 四、绑定自定义域名

### 4.1 在项目中创建 CNAME 文件

在网站根目录创建 `CNAME` 文件（无后缀），内容只写一行域名：

```
yuntai.tech
```

然后提交推送：

```bash
git add CNAME
git commit -m "Add CNAME for custom domain"
git push
```

### 4.2 在 GitHub Pages 设置中填写域名

1. 回到仓库 **Settings → Pages**
2. **Custom domain** 输入：`yuntai.tech`
3. 点击 **Save**
4. 等待 DNS 检查通过后，勾选 **Enforce HTTPS**

### 4.3 在阿里云配置 DNS 解析

1. 登录 [阿里云域名控制台](https://dc.console.aliyun.com/)
2. 找到 `yuntai.tech`，点击 **解析**
3. 添加以下 **5 条**解析记录：

#### A 记录（根域名指向 GitHub Pages 服务器）

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

#### CNAME 记录（www 子域名）

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|-------|
| CNAME | www | `<你的用户名>.github.io` |

> **注意：** 把 `<你的用户名>` 替换为你的 GitHub 用户名，例如 `zhangsan.github.io`

### 4.4 等待 DNS 生效

- 阿里云 DNS 通常 **10 分钟内**生效（最长 48 小时）
- 可以用以下命令检查 DNS 是否已生效：

```bash
# 检查 A 记录
nslookup yuntai.tech

# 检查 CNAME
nslookup www.yuntai.tech
```

正常情况下应该返回 GitHub Pages 的 IP 地址（185.199.10x.153）。

### 4.5 验证 HTTPS

DNS 生效后，回到 GitHub Pages 设置页面：

1. 确认 **Custom domain** 显示绿色对勾 ✅
2. 勾选 **Enforce HTTPS**（如果未自动勾选）
3. GitHub 会自动申请 Let's Encrypt SSL 证书，通常 **15-30 分钟**完成

---

## 五、验证部署

逐个访问以下地址，确认一切正常：

| 页面 | 地址 |
|-----|------|
| 主站首页 | https://yuntai.tech |
| GrowBook 详情页 | https://yuntai.tech/growbook/index.html |
| 隐私政策 | https://yuntai.tech/growbook/privacy.html |
| www 跳转 | https://www.yuntai.tech（应自动跳转到 yuntai.tech） |

---

## 六、后续更新网站

每次修改文件后，只需三条命令：

```bash
git add .
git commit -m "描述你的修改"
git push
```

GitHub Pages 会自动重新部署，通常 **1-2 分钟**生效。

---

## 七、常见问题

### Q: 访问域名显示 404
- 确认 `CNAME` 文件在仓库根目录且内容正确
- 确认 GitHub Pages 设置中 Source 选了 `main` 分支
- 等待几分钟让部署完成

### Q: DNS 解析不生效
- 确认阿里云解析记录无误（特别是 CNAME 记录值末尾不要漏掉）
- 清除本地 DNS 缓存：`ipconfig /flushdns`（Windows）
- 耐心等待，新域名最长需要 48 小时全球生效

### Q: HTTPS 证书未生效
- 确认 DNS 已正确指向 GitHub Pages
- 到 Settings → Pages 检查是否有错误提示
- GitHub 申请证书可能需要 30 分钟，请耐心等待

### Q: Google Play 隐私政策地址填什么
- 填写：`https://yuntai.tech/growbook/privacy.html`

### Q: 以后新增 APP 怎么加页面
- 在根目录新建文件夹（如 `myapp2/`），放入 `index.html` 和 `privacy.html`
- 在主站 `index.html` 的 `apps-grid` 中新增一个 app-card
- 提交推送即可
