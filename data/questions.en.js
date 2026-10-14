if (window.FATEBOOK_LANGUAGE === "en") {
  window.ONBOARDING = [
    {
      id: "focus",
      text: "What’s been on your mind the most lately?",
      options: [
        { emoji: "💼", label: "Work", tag: "work" },
        { emoji: "🏠", label: "Family", tag: "family" },
        { emoji: "🌿", label: "Myself", tag: "self" },
        { emoji: "💰", label: "Money", tag: "money" }
      ]
    },
    {
      id: "belief",
      text: "What do you believe in most?",
      options: [
        { emoji: "⛰", label: "Effort", tag: "effort" },
        { emoji: "🌙", label: "Timing", tag: "timing" },
        { emoji: "🤝", label: "People", tag: "people" }
      ]
    }
  ];

  window.DAILY_QUESTIONS = [
    {
      id: "state_1", category: "state",
      text: "Which feels most like you today?",
      options: [
        { emoji: "🔥", label: "Ready to go", tag: "fire" },
        { emoji: "🌊", label: "Taking it easy", tag: "wave" },
        { emoji: "🌫", label: "A little scattered", tag: "fog" },
        { emoji: "🌱", label: "At ease", tag: "sprout" }
      ]
    },
    {
      id: "state_2", category: "state",
      text: "What’s the weather like in your heart right now?",
      options: [
        { emoji: "☀️", label: "Sunny", tag: "fire" },
        { emoji: "☁️", label: "Cloudy", tag: "wave" },
        { emoji: "🌧", label: "Rainy", tag: "fog" },
        { emoji: "🌤", label: "Clearing up", tag: "sprout" }
      ]
    },
    {
      id: "focus_1", category: "focus",
      text: "What would you most like to care for today?",
      options: [
        { emoji: "💼", label: "Work", tag: "work" },
        { emoji: "🏠", label: "Family", tag: "family" },
        { emoji: "🌿", label: "Myself", tag: "self" },
        { emoji: "💰", label: "Money", tag: "money" }
      ]
    },
    {
      id: "hope_1", category: "hope",
      text: "What are you hoping for today?",
      options: [
        { emoji: "📩", label: "Good news", tag: "news" },
        { emoji: "🕯", label: "A little calm", tag: "calm" },
        { emoji: "⚡", label: "A breakthrough", tag: "breakthrough" },
        { emoji: "🫂", label: "To feel understood", tag: "understood" }
      ]
    }
  ];
}
