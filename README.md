# 命运书 FateBook（无 AI 版 MVP）

一本会记住你的书。每天回答一个选择题，翻开一页。纯静态网站，可直接部署到 GitHub Pages。

## 目录

```
fatebook/
├── index.html          # 入口
├── .nojekyll           # 让 GitHub Pages 原样发布
├── css/style.css       # 样式 + 翻书动画
├── js/app.js           # 全部逻辑（路由、记忆、抽页、回忆、分享）
├── data/i18n.js        # 浏览器语言检测 + 界面文案
├── data/questions.js   # 首次问题 + 每日问题
├── data/questions.en.js # 英文问题
├── data/content.js     # 内容库（箴言 + 今日小事，带标签）
├── data/content.en.js  # 英文内容库
└── assets/favicon.svg
```

## 每日流程

首次：回答 2 题 → 回顾上一页的小事是否完成 → 每日一问 → 翻开今天 → 反馈「说中了吗」→ 保存分享图

所有数据存在浏览器 localStorage（键 `fatebook_v1`），不登录、无后端。

## 多语言

界面会跟随浏览器首选语言自动显示中文或英文；其他语言默认显示英文。页面右上角可以随时切换语言，选择会保存在本机浏览器。通过 `?lang=zh` 或 `?lang=en` 可临时预览指定语言。

问题和两种语言的内容库使用相同的标签与内容 ID，因此切换语言不会影响已保存的回答、抽页和历史反馈。

## 本地运行

直接双击 `index.html` 即可；或 `python -m http.server 8000` 后访问 http://localhost:8000

调试参数：
- `?reset` 清空本地数据
- `?date=2026-10-20` 模拟某一天（可连续换日期测试回顾、连续天数、周规律）

## 部署到 GitHub Pages

1. 新建仓库，把本目录内容推到 `main` 分支根目录
2. Settings → Pages → Source 选 `Deploy from a branch`，分支 `main` / `/ (root)`
3. 几分钟后访问 `https://<用户名>.github.io/<仓库名>/`
4. 自定义域名：在 Pages 设置里填域名，并在 DNS 加 CNAME 指向 `<用户名>.github.io`

## 内容库

目前内容库有 344 条：24 条基础内容，以及由 4 种状态、8 个关注方向和 10 种表达组合出的 320 条内容变体。新增内容时，把对象追加到 `data/content.js` 的 `window.CONTENT`，并从 `c345` 开始使用未占用的 id：

```
生成至少 300 条"命运书"内容，输出 JS 对象数组，id 从 c345 开始连续递增，格式：
{ id: "c345", tags: ["fog", "work"], message: "...", action: "..." }
要求：
- tags 必须从两组各选 1 个：状态 [fire, wave, fog, sprout]，关注/期待 [work, family, self, money, news, calm, breakthrough, understood]
- message：温柔、略带神秘感的箴言，不超过 20 个汉字
- action：今天 10 分钟内能完成、无需购买东西的具体小事
- 禁止预测具体事件，禁止星座、玄学术语、医疗或投资建议
- 各标签组合尽量均匀分布；所有 id 不重复，表达和行动避免同义重复
```

## 上线后看什么

第 7 天回访率（第 7 天仍翻开书的用户比例）。可在 `index.html` 加 Plausible / GoatCounter 等轻量统计脚本来计算。
