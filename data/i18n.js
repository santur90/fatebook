(function () {
  const strings = {
    zh: {
      title: "命运书 FateBook",
      description: "一本会记住你的书。每天翻开一页。",
      language: "English",
      onboardingIntro: "这是一本会记住你的书。<br>先让它认识你。",
      lastPage: "上一次，书页对你说：",
      reviewQuestion: "你做了吗？",
      reviewOptions: ["做了", "没做", "忘了"],
      beforeQuestion: "翻开之前，书想先问你一句。",
      bookTitle: "命运书",
      openBook: "翻开今天",
      oncePerDay: "每天只能翻开一次",
      page: "第 {page} 页",
      action: "今日小事",
      feedbackQuestion: "这一页说中你了吗？",
      feedbackSaved: "书已记下你的回答",
      feedbackOptions: ["✨ 说中了", "🤔 一般", "❌ 不像我"],
      share: "保存这一页",
      tomorrow: "明天再来，书会翻到新的一页",
      shareTitle: "我的命运书",
      shareError: "图片生成失败，请检查网络后重试。",
      recallDone: "上一页的小事，你说做到了。我记下了。",
      recallNotDone: "上一页的事没做也没关系，书页不催人。",
      recallWeek: "这一周，你有 {count} 次说自己「{label}」。",
      recallStreak: "这是你连续第 {count} 天翻开我。",
      recallNight: "你总在深夜翻开我。今天这页，留给睡前的你。",
      recallFirst: "我们才刚认识。往后的每一页，我都会记得。",
      recallReturn: "书页记得你来过。",
      stateLabels: { fire: "想冲", wave: "想躺", fog: "有点乱", sprout: "平静" }
    },
    en: {
      title: "FateBook",
      description: "A little book that remembers you. Open a page each day.",
      language: "中文",
      onboardingIntro: "A little book that remembers you.<br>Let’s get to know each other.",
      lastPage: "Last time, this page said:",
      reviewQuestion: "Did you do it?",
      reviewOptions: ["I did", "Not yet", "I forgot"],
      beforeQuestion: "Before we open today’s page, a little question.",
      bookTitle: "FateBook",
      openBook: "Open today’s page",
      oncePerDay: "One page a day",
      page: "Page {page}",
      action: "A little thing for today",
      feedbackQuestion: "Did this page feel like you?",
      feedbackSaved: "The book remembers your answer",
      feedbackOptions: ["✨ It did", "🤔 A little", "❌ Not really"],
      share: "Save this page",
      tomorrow: "Come back tomorrow for a new page",
      shareTitle: "My FateBook",
      shareError: "Couldn’t create the image. Please check your connection and try again.",
      recallDone: "You said you did the little thing from last time. I remember.",
      recallNotDone: "It’s okay if you didn’t get to it. The book won’t rush you.",
      recallWeek: "This week, you said you felt “{label}” {count} times.",
      recallStreak: "You’ve opened me {count} days in a row.",
      recallNight: "You often open me late at night. This page is for before bed.",
      recallFirst: "We’ve only just met. I’ll remember each page from here on.",
      recallReturn: "The pages remember you’ve been here.",
      stateLabels: { fire: "ready to go", wave: "low on energy", fog: "a little scattered", sprout: "at ease" }
    }
  };

  const params = new URLSearchParams(location.search);
  const savedLanguage = localStorage.getItem("fatebook_language");
  const requestedLanguage = params.get("lang");
  const systemLanguages = navigator.languages || [navigator.language || "en"];
  const detectedLanguage = systemLanguages
    .map(language => language.toLowerCase().startsWith("zh") ? "zh" : language.toLowerCase().startsWith("en") ? "en" : null)
    .find(Boolean) || "en";
  const language = ["zh", "en"].includes(requestedLanguage)
    ? requestedLanguage
    : ["zh", "en"].includes(savedLanguage)
      ? savedLanguage
      : detectedLanguage;

  window.FATEBOOK_LANGUAGE = language;
  window.I18N = strings;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = strings[language].title;
  document.querySelector('meta[name="description"]').content = strings[language].description;
})();
