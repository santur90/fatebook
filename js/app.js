(function () {
  "use strict";

  const STORE_KEY = "fatebook_v1";
  const $app = document.getElementById("app");
  const params = new URLSearchParams(location.search);
  const T = window.I18N[window.FATEBOOK_LANGUAGE];

  // 调试：?reset 清空数据；?date=2026-10-20 模拟某一天
  if (params.has("reset")) localStorage.removeItem(STORE_KEY);
  const DATE_OVERRIDE = params.get("date");

  /* ---------- 工具函数 ---------- */
  function dateKey(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function todayKey(d) {
    if (!d && DATE_OVERRIDE) return DATE_OVERRIDE;
    return dateKey(d || new Date());
  }
  function toDate(key) { return new Date(key + "T00:00:00"); }
  function daysBetween(a, b) { return Math.round((toDate(b) - toDate(a)) / 86400000); }
  function shiftDay(key, n) { const d = toDate(key); d.setDate(d.getDate() + n); return dateKey(d); }
  function uuid() {
    return crypto.randomUUID ? crypto.randomUUID() : "u" + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) { // mulberry32：同一用户同一天结果固定
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- 存储 ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { return null; }
  }
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

  let state = load() || { userId: uuid(), createdAt: todayKey(), onboarding: {}, checkins: [], pages: [], opens: [] };

  (function recordOpen() {
    const t = todayKey();
    if (!state.opens.some(o => o.date === t)) {
      state.opens.push({ date: t, hour: new Date().getHours() });
      state.opens = state.opens.slice(-60);
    }
    save();
  })();

  const getPage = date => state.pages.find(p => p.date === date);
  const getCheckin = date => state.checkins.find(c => c.date === date);
  const getContent = page => window.CONTENT.find(c => c.id === page.contentId) || page;
  const onboardingDone = () => window.ONBOARDING.every(q => state.onboarding[q.id]);
  function lastPageBefore(t) {
    return state.pages.filter(p => p.date < t).sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  }

  /* ---------- 路由 ---------- */
  function route() {
    const t = todayKey();
    if (!onboardingDone()) return renderOnboarding();
    const page = getPage(t);
    if (page) return renderPage(page, false);
    const prev = lastPageBefore(t);
    if (prev && prev.done === undefined) return renderReview(prev);
    if (!getCheckin(t)) return renderQuestion();
    return renderClosedBook();
  }

  function optionsHTML(options) {
    return '<div class="options">' + options.map(o =>
      `<button class="opt" data-tag="${o.tag}" data-label="${o.label}"><span class="emoji">${o.emoji || ""}</span>${o.label}</button>`
    ).join("") + "</div>";
  }
  function renderScreen(content) {
    $app.innerHTML = `<button class="language-switch" id="language-switch" type="button">${T.language}</button>${content}`;
    document.getElementById("language-switch").addEventListener("click", () => {
      const language = window.FATEBOOK_LANGUAGE === "zh" ? "en" : "zh";
      localStorage.setItem("fatebook_language", language);
      const nextUrl = new URL(location.href);
      nextUrl.searchParams.delete("lang");
      nextUrl.searchParams.delete("reset");
      location.assign(nextUrl.href);
    });
  }
  function bindOptions(cb) {
    $app.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => cb(b.dataset.tag, b.dataset.label)));
  }

  /* ---------- 页面：首次认识 ---------- */
  function renderOnboarding() {
    const list = window.ONBOARDING;
    const q = list.find(x => !state.onboarding[x.id]);
    const idx = list.indexOf(q);
    renderScreen(`<section class="screen fade-in">
      ${idx === 0 ? `<p class="intro">${T.onboardingIntro}</p>` : ""}
      <p class="step">${idx + 1} / ${list.length}</p>
      <h2 class="question">${q.text}</h2>
      ${optionsHTML(q.options)}
    </section>`);
    bindOptions(tag => { state.onboarding[q.id] = tag; save(); route(); });
  }

  /* ---------- 页面：回顾上一页 ---------- */
  function renderReview(prev) {
    renderScreen(`<section class="screen fade-in">
      <p class="intro">${T.lastPage}</p>
      <blockquote class="quote">${getContent(prev).action}</blockquote>
      <h2 class="question">${T.reviewQuestion}</h2>
      ${optionsHTML([
        { emoji: "✅", label: T.reviewOptions[0], tag: "done" },
        { emoji: "⏳", label: T.reviewOptions[1], tag: "not" },
        { emoji: "💭", label: T.reviewOptions[2], tag: "forgot" }
      ])}
    </section>`);
    bindOptions(tag => { prev.done = tag; save(); route(); });
  }

  /* ---------- 页面：每日一问 ---------- */
  function dailyQuestion(t) {
    const all = window.DAILY_QUESTIONS;
    const stateQs = all.filter(q => q.category === "state");
    const otherQs = all.filter(q => q.category !== "state");
    const day = Math.floor(toDate(t).getTime() / 86400000);
    // 隔天出一次"状态"题，保证有足够数据做规律回忆
    if (day % 2 === 0 || !otherQs.length) return stateQs[Math.floor(day / 2) % stateQs.length];
    return otherQs[Math.floor(day / 2) % otherQs.length];
  }

  function renderQuestion() {
    const t = todayKey();
    const q = dailyQuestion(t);
    renderScreen(`<section class="screen fade-in">
      <p class="intro">${T.beforeQuestion}</p>
      <h2 class="question">${q.text}</h2>
      ${optionsHTML(q.options)}
    </section>`);
    bindOptions((tag, label) => {
      state.checkins.push({ date: t, qid: q.id, cat: q.category, tag, label });
      state.checkins = state.checkins.slice(-180);
      save(); route();
    });
  }

  /* ---------- 页面：合上的书 ---------- */
  function renderClosedBook() {
    renderScreen(`<section class="screen fade-in">
      <div class="book" id="book">
        <div class="inner"><span>✦</span></div>
        <div class="cover"><div class="cover-title">${T.bookTitle}</div><div class="cover-sub">FATEBOOK</div></div>
      </div>
      <button class="primary" id="open">${T.openBook}</button>
      <p class="hint">${T.oncePerDay}</p>
    </section>`);
    document.getElementById("open").addEventListener("click", e => {
      e.target.disabled = true;
      document.getElementById("book").classList.add("opening");
      const p = generatePage();
      state.pages.push(p);
      state.pages = state.pages.slice(-180);
      save();
      setTimeout(() => {
        renderPage(p, true);
      }, 1400);
    });
  }

  /* ---------- 生成今天这一页（纯规则，无 AI） ---------- */
  function tagScores() { // 根据"说中了/不像我"反馈，累计各标签偏好
    const s = {};
    state.pages.forEach(p => {
      if (!p.feedback) return;
      const c = window.CONTENT.find(x => x.id === p.contentId);
      if (!c) return;
      const delta = p.feedback === "hit" ? 1 : p.feedback === "miss" ? -1 : 0;
      c.tags.forEach(tag => { s[tag] = (s[tag] || 0) + delta; });
    });
    return s;
  }

  function generatePage() {
    const t = todayKey();
    const r = rng(hash(state.userId + t));
    const today = getCheckin(t);
    const focus = state.onboarding.focus;
    const pref = tagScores();
    const recent = new Set(state.pages.filter(p => {
      const age = daysBetween(p.date, t);
      return age >= 0 && age <= 30;
    }).map(p => p.contentId));

    let pool = window.CONTENT.filter(c => !recent.has(c.id));
    if (!pool.length) pool = window.CONTENT.slice();

    const scored = pool.map(c => {
      let s = 1;
      if (today && c.tags.includes(today.tag)) s += 3;
      if (focus && c.tags.includes(focus)) s += 2;
      c.tags.forEach(tag => { if (pref[tag]) s += Math.max(-1, Math.min(3, pref[tag])) * 0.5; });
      return { c, s: Math.max(0.2, s) };
    });
    const total = scored.reduce((a, x) => a + x.s, 0);
    let pick = r() * total, chosen = scored[0].c;
    for (const x of scored) { pick -= x.s; if (pick <= 0) { chosen = x.c; break; } }

    return {
      date: t,
      pageNo: 100 + Math.floor(r() * 900),
      contentId: chosen.id,
      recall: buildRecall(t),
      message: chosen.message,
      action: chosen.action
    };
  }

  function calcStreak(t) { // 截至 t 前一天，连续翻书天数
    let n = 0, d = shiftDay(t, -1);
    while (getPage(d)) { n++; d = shiftDay(d, -1); }
    return n;
  }

  // "书记得你"：全部基于真实点选数据，不编造
  function buildRecall(t) {
    const lines = [];
    const prev = lastPageBefore(t);
    if (prev && prev.done === "done") lines.push(T.recallDone);
    else if (prev && prev.done === "not") lines.push(T.recallNotDone);

    const week = state.checkins.filter(c => c.cat === "state" && daysBetween(c.date, t) < 7 && daysBetween(c.date, t) >= 0);
    if (week.length >= 3) {
      const count = {};
      week.forEach(c => { count[c.tag] = (count[c.tag] || 0) + 1; });
      const [tag, n] = Object.entries(count).sort((a, b) => b[1] - a[1])[0];
      const latestAnswer = week.filter(c => c.tag === tag).sort((a, b) => b.date.localeCompare(a.date))[0];
      const question = window.DAILY_QUESTIONS.find(q => q.id === latestAnswer.qid);
      const label = question?.options.find(option => option.tag === tag)?.label || T.stateLabels[tag];
      if (n >= 2) lines.push(T.recallWeek.replace("{count}", n).replace("{label}", label));
    }

    const streak = calcStreak(t) + 1;
    if (lines.length < 2 && streak >= 3) lines.push(T.recallStreak.replace("{count}", streak));

    const hour = new Date().getHours();
    const nights = state.opens.filter(o => o.hour >= 22 || o.hour < 4).length;
    if (lines.length < 2 && nights >= 3 && (hour >= 22 || hour < 4)) lines.push(T.recallNight);

    if (!lines.length) lines.push(state.pages.filter(page => page.date < t).length === 0 ? T.recallFirst : T.recallReturn);
    return lines.slice(0, 2).join("");
  }

  /* ---------- 页面：今日命运页 ---------- */
  function renderPage(p, animate) {
    const content = getContent(p);
    const fb = [
      { k: "hit", t: T.feedbackOptions[0] },
      { k: "meh", t: T.feedbackOptions[1] },
      { k: "miss", t: T.feedbackOptions[2] }
    ];
    renderScreen(`<section class="screen">
      <article class="page-card ${animate ? "reveal" : "fade-in"}" id="card">
        <div class="page-no">${T.page.replace("{page}", p.pageNo)}</div>
        <p class="recall">${buildRecall(p.date)}</p>
        <div class="divider">✦</div>
        <p class="message">${content.message}</p>
        <div class="action"><span>${T.action}</span><p>${content.action}</p></div>
        <div class="date">${p.date} · FateBook</div>
      </article>
      <div class="feedback">
        <p>${p.feedback ? T.feedbackSaved : T.feedbackQuestion}</p>
        <div class="fb-row">${fb.map(f => `<button class="fb ${p.feedback === f.k ? "selected" : ""}" data-k="${f.k}">${f.t}</button>`).join("")}</div>
      </div>
      <button class="secondary" id="share">${T.share}</button>
      <p class="hint">${T.tomorrow}</p>
    </section>`);
    $app.querySelectorAll(".fb").forEach(b => b.addEventListener("click", () => {
      p.feedback = b.dataset.k; save(); renderPage(p, false);
    }));
    document.getElementById("share").addEventListener("click", sharePage);
  }

  async function sharePage() {
    const button = document.getElementById("share");
    button.disabled = true;
    try {
      if (!window.html2canvas) throw new Error("图片组件尚未加载");
      const canvas = await window.html2canvas(document.getElementById("card"), { scale: 2, backgroundColor: null });
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("浏览器无法生成图片");

      const name = `fatebook-${todayKey()}.png`;
      if (typeof File !== "undefined" && navigator.canShare && navigator.share) {
        const file = new File([blob], name, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          try { await navigator.share({ files: [file], title: T.shareTitle }); return; }
          catch (e) { if (e.name === "AbortError") return; }
        }
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error("命运书分享图片生成失败：", e);
      alert(T.shareError);
    } finally {
      button.disabled = false;
    }
  }

  route();
})();
