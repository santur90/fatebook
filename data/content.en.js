if (window.FATEBOOK_LANGUAGE === "en") {
  window.CONTENT = [
    { id: "c001", tags: ["fire", "work"], message: "When the moment is right, begin with the hardest thing.", action: "Spend ten minutes on the task you’ve been avoiding." },
    { id: "c002", tags: ["fire", "breakthrough"], message: "Sometimes the door opens on the second try.", action: "Reach out once more to someone you haven’t heard back from." },
    { id: "c003", tags: ["fire", "money"], message: "A little planning keeps your spark from burning out.", action: "Write down one important expense or source of income this week." },
    { id: "c004", tags: ["fire", "self"], message: "Let some of today’s energy belong to you.", action: "Set yourself one small goal to finish by tonight." },
    { id: "c005", tags: ["wave", "calm"], message: "When the tide recedes, the shore comes into view.", action: "Turn off notifications and sit quietly for ten minutes." },
    { id: "c006", tags: ["wave", "self"], message: "Rest isn’t falling behind; it’s catching your breath.", action: "Stretch for five minutes and give yourself a moment to reset." },
    { id: "c007", tags: ["wave", "family"], message: "You don’t have to try hard; being there is a gift.", action: "Send a family member a quick hello and ask how they are." },
    { id: "c008", tags: ["wave", "work"], message: "Taking it slowly is still moving forward.", action: "Pick one small task and focus on it for five minutes." },
    { id: "c009", tags: ["fog", "self"], message: "When you can’t see far, look at the next step.", action: "List three things on your mind and circle just one." },
    { id: "c010", tags: ["fog", "work"], message: "Things feel tangled when you’re carrying too much.", action: "Cross one unnecessary task off your list." },
    { id: "c011", tags: ["fog", "understood"], message: "Saying it out loud can clear half the fog.", action: "Text someone you trust: “Things feel a little tangled lately.”" },
    { id: "c012", tags: ["fog", "money"], message: "Numbers are often kinder than worry.", action: "Take five minutes to look over this month’s spending." },
    { id: "c013", tags: ["sprout", "calm"], message: "Quiet days are when roots grow.", action: "Write down one small thing that made you feel at ease today." },
    { id: "c014", tags: ["sprout", "family"], message: "Ordinary days are often the ones worth keeping.", action: "Send your family a photo of something you saw today." },
    { id: "c015", tags: ["sprout", "work"], message: "When things are steady, plant one new seed.", action: "Spend five minutes exploring something you’re curious about." },
    { id: "c016", tags: ["sprout", "self"], message: "You’ve come farther than you were a month ago.", action: "Write one kind sentence about yourself." },
    { id: "c017", tags: ["sprout", "news"], message: "Good news sometimes waits in a message you’ve already sent.", action: "Take five minutes to politely follow up on an email." },
    { id: "c018", tags: ["sprout", "family"], message: "You can be someone else’s good news.", action: "Tell your family one good thing from today." },
    { id: "c019", tags: ["fog", "breakthrough"], message: "A breakthrough can begin with a different question.", action: "Rewrite the problem that’s been keeping you stuck." },
    { id: "c020", tags: ["fire", "money"], message: "Small changes grow quietly over time.", action: "Cancel one subscription you no longer use." },
    { id: "c021", tags: ["wave", "understood"], message: "Before understanding comes the feeling of being heard.", action: "Ask someone you trust how they’ve been lately." },
    { id: "c022", tags: ["sprout", "understood"], message: "You don’t need everyone to understand you.", action: "Listen to a favorite song and take a few minutes for yourself." },
    { id: "c023", tags: ["wave", "money"], message: "Waiting to decide is a decision, too.", action: "Write down a nonessential purchase and revisit it tomorrow." },
    { id: "c024", tags: ["sprout", "work"], message: "Quiet focus can be worth more than a busy day.", action: "Choose one thing and give it five minutes of focus." }
  ];

  const states = [
    {
      tag: "fire",
      messages: ["A spark is gathering", "Your inner fire", "Action is finding its echo", "Courage is drawing near", "The urge to move", "You needn’t wait for perfect", "There is strength in this moment", "You’ve found a beginning", "Your passion needs a path", "Your steps can feel lighter"],
      starts: ["Pause for a breath, then", "Bring your attention back, then", "Choose your first step, then", "Take three slow breaths, then", "Give yourself a minute, then", "Focus on what’s in front of you, then", "Pick what matters most, then", "Stand and stretch, then", "Take a small pause, then", "Rest for a moment, then"]
    },
    {
      tag: "wave",
      messages: ["The waves will soften", "Gentleness is a strength", "You needn’t swim upstream", "You’re allowed to slow down", "Quiet is a kind of progress", "Every tide has its rhythm", "It’s okay to take a pause", "Give your heart some room", "There’s no rush to arrive", "You don’t have to push today"],
      starts: ["Sit quietly for a minute, then", "Begin a little more slowly, then", "Give yourself two minutes, then", "Stretch your arms, then", "Listen to the sounds around you, then", "Set aside what you’re doing, then", "Take a few sips of water, then", "Take three gentle breaths, then", "Leave a little space, then", "Settle in for a moment, then"]
    },
    {
      tag: "fog",
      messages: ["Look for the next step", "Even a tangle has an end", "Care for the step at hand", "You needn’t solve it all", "The question is getting clearer", "The pieces will come together", "The answer can wait", "It’s okay not to know yet", "One small step is enough", "Let the noise settle"],
      starts: ["Choose the smallest thing, then", "Take a minute to sort your thoughts, then", "Make the question smaller, then", "Cross off one thing that can wait, then", "Find a quiet corner and", "Take a few slow breaths, then", "Take three steady breaths, then", "Choose just one thing, then", "Pause and give it a moment, then", "Start with the easiest step, then"]
    },
    {
      tag: "sprout",
      messages: ["Calm is taking root", "Steadiness is a kind of growth", "A new bud takes its time", "The everyday leaves an echo", "You’re quietly building", "Keep going gently", "Small things can take root", "Roots matter more than bloom", "There’s already a little light", "Steady has its own strength"],
      starts: ["Take a minute to notice this moment, then", "Begin with curiosity, then", "Make a little room in your day, then", "Notice a small thing nearby, then", "Give yourself a quiet moment, then", "Settle into the present, then", "Begin with a lighter heart, then", "Be a little kinder to yourself, then", "Give this a small beginning, then", "Sit quietly and consider, then"]
    }
  ];

  const themes = [
    { tag: "work", messages: ["put one thing in order", "bring your focus back", "choose what matters today", "leave room in the plan", "steady beats hurried", "make your boundaries clear", "one thing is progress", "done can come before perfect", "your pace matters", "good work takes its time"], actions: ["write down the one thing that matters most today.", "clear one small corner of your desk.", "reply to one short email.", "list three things for tomorrow.", "turn off one unnecessary notification.", "break a task into two steps.", "focus on one small task for five minutes.", "organize one file or folder.", "leave ten minutes open in your schedule.", "note one small thing you’ve finished."] },
    { tag: "family", messages: ["let care find its words", "presence needn’t be grand", "a hello is a small gift", "listen before you answer", "kindness can be simple", "leave a little room for patience", "relationships live in small things", "let someone know you’re thinking of them", "there’s room to come closer", "a little sincerity goes far"], actions: ["send a family member a simple hello.", "listen to someone for five minutes.", "share a photo from your day.", "say thank you for one specific thing.", "ask a family member how their day went.", "share one small thing from today.", "have a short chat without your phone.", "send someone you care about a voice message.", "write down one update about your family.", "show someone you care in a small way."] },
    { tag: "self", messages: ["save a little room for yourself", "you deserve care, too", "listen for what’s in your heart", "you don’t have to be strong all the time", "go a little easier on yourself", "rest belongs on the list", "your feelings matter", "you can take your time", "caring for yourself isn’t selfish", "come back to your own side"], actions: ["drink a glass of water and take a short break.", "write down one thing you appreciate about yourself.", "stretch for five minutes.", "put your phone down for two quiet minutes.", "listen to a song you love.", "make one small corner feel more comfortable.", "make yourself a simple snack.", "walk to a window and look into the distance.", "write down how you really feel right now.", "leave one non-urgent thing for tomorrow."] },
    { tag: "money", messages: ["see clearly before deciding", "numbers can bring steadiness", "give your budget some patience", "there’s no need to decide at once", "small habits add up", "pause before you spend", "clarity feels better than guessing", "a simple plan is enough", "notice what matters to you", "one steady step at a time"], actions: ["look over this week’s spending.", "write down one thing you spent today.", "check whether you still need one subscription.", "set a small budget for this week.", "tidy up your wallet or payment statements.", "write down something you want and revisit it tomorrow.", "list one upcoming essential expense.", "spend five minutes checking one bill.", "find one nonessential expense you could pause.", "write down a short-term savings goal."] },
    { tag: "news", messages: ["give the reply a little time", "life is bigger than the inbox", "take the step you can take", "steady yourself in the unknown", "hope can be held lightly", "notice the good that’s already here", "waiting doesn’t mean standing still", "care for yourself today", "hold your hopes gently", "you don’t have to chase an answer"], actions: ["check once for an important update.", "send a brief follow-up to someone you’re waiting to hear from.", "confirm the time of an upcoming plan.", "write down one piece of good news you’ve received.", "add one pending question to your list.", "check your email once, then put your phone away.", "set a reminder for something you’re waiting on.", "tell a friend one small update from lately.", "organize one message that needs a reply.", "take a five-minute break from checking for updates."] },
    { tag: "calm", messages: ["bring your heart back to now", "quiet is worth keeping", "you needn’t find the answer yet", "leave yourself a little space", "peace begins with small things", "slow down and listen inward", "this moment is enough", "come back to your breath", "keep a small light within", "calm can be a choice"], actions: ["close your eyes and breathe slowly for a minute.", "put one thing on your desk back in its place.", "turn off notifications for five minutes.", "make yourself a favorite drink.", "take a slow five-minute walk outside.", "listen to a little calming music.", "gently stretch your neck and shoulders.", "tidy one very small space.", "look out the window at the sky.", "leave your phone farther away before bed."] },
    { tag: "breakthrough", messages: ["try seeing it another way", "the opening may be small", "try one new approach", "being stuck isn’t the end", "ask the question again", "testing is a kind of progress", "one step can loosen the knot", "start first, adjust as you go", "you needn’t solve it all at once", "new paths start small"], actions: ["rewrite the problem in different words.", "list two new angles on a hard question.", "try one small step for five minutes.", "ask someone you trust one specific question.", "write down one workable idea for now.", "break a big goal into its first action.", "find the easiest thing you could change.", "describe the problem from the opposite point of view.", "write one pro and one con for an idea.", "give a postponed task a fresh, tiny start."] },
    { tag: "understood", messages: ["let a little honesty through", "say what you really need", "being heard begins with sharing", "not everyone has to understand", "your feelings deserve care", "make room for what’s true", "be specific about what you need", "understanding takes time, too", "set a boundary with kindness", "you’re allowed to ask for support"], actions: ["write down one thing you wish you could say.", "tell someone you trust how you’re feeling.", "clearly ask for one small thing you need.", "ask someone if they can listen for five minutes.", "send a quick update to someone who cares about you.", "write a boundary in calm, simple words.", "listen for what matters most to you right now.", "thank someone for a small kindness.", "set a time for an easy conversation.", "write what you want to say in your notes first."] }
  ];

  let nextContentId = 25;
  states.forEach((state, stateIndex) => {
    themes.forEach((theme, themeIndex) => {
      for (let variant = 0; variant < 10; variant++) {
        const themeIndexForVariant = (variant + themeIndex) % 10;
        const actionIndex = (variant + stateIndex + themeIndex) % 10;
        window.CONTENT.push({
          id: "c" + String(nextContentId++).padStart(3, "0"),
          tags: [state.tag, theme.tag],
          message: `${state.messages[variant]}—${theme.messages[themeIndexForVariant]}.`,
          action: `${state.starts[variant]} ${theme.actions[actionIndex]}`
        });
      }
    });
  });
}
