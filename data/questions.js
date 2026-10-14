// 首次打开时的问题（全部答完才进入每日流程）
window.ONBOARDING = [
  {
    id: "focus",
    text: "最近，最占据你心思的是？",
    options: [
      { emoji: "💼", label: "工作", tag: "work" },
      { emoji: "🏠", label: "家人", tag: "family" },
      { emoji: "🌿", label: "自己", tag: "self" },
      { emoji: "💰", label: "钱", tag: "money" }
    ]
  },
  {
    id: "belief",
    text: "你更相信哪一个？",
    options: [
      { emoji: "⛰", label: "努力", tag: "effort" },
      { emoji: "🌙", label: "时机", tag: "timing" },
      { emoji: "🤝", label: "人", tag: "people" }
    ]
  }
];

// 每日问题。category = "state" 的题隔天出现一次，供"规律回忆"统计使用
window.DAILY_QUESTIONS = [
  {
    id: "state_1", category: "state",
    text: "今天的你，更像哪一种？",
    options: [
      { emoji: "🔥", label: "想冲", tag: "fire" },
      { emoji: "🌊", label: "想躺", tag: "wave" },
      { emoji: "🌫", label: "有点乱", tag: "fog" },
      { emoji: "🌱", label: "平静", tag: "sprout" }
    ]
  },
  {
    id: "state_2", category: "state",
    text: "此刻你的心，是什么天气？",
    options: [
      { emoji: "☀️", label: "晴", tag: "fire" },
      { emoji: "☁️", label: "阴", tag: "wave" },
      { emoji: "🌧", label: "雨", tag: "fog" },
      { emoji: "🌤", label: "多云转晴", tag: "sprout" }
    ]
  },
  {
    id: "focus_1", category: "focus",
    text: "今天最想照顾好的是？",
    options: [
      { emoji: "💼", label: "工作", tag: "work" },
      { emoji: "🏠", label: "家人", tag: "family" },
      { emoji: "🌿", label: "自己", tag: "self" },
      { emoji: "💰", label: "钱", tag: "money" }
    ]
  },
  {
    id: "hope_1", category: "hope",
    text: "今天，你希望发生什么？",
    options: [
      { emoji: "📩", label: "好消息", tag: "news" },
      { emoji: "🕯", label: "安静", tag: "calm" },
      { emoji: "⚡", label: "突破", tag: "breakthrough" },
      { emoji: "🫂", label: "被理解", tag: "understood" }
    ]
  }
];
