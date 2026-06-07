/**
 * Test Fixtures for Daily Hug for Claire
 * These fixtures can be used for unit testing and integration testing
 */

export const moodFixtures = {
  moods: {
    happy: {
      value: 'happy',
      label: '🌸 SUNNY! 😊',
      buttonClass: 'btn-sunny',
      expectedMessage: "I'm so happy your sky is sunny today! Keep shining, Claire! ☀️💖",
    },
    okay: {
      value: 'okay',
      label: '☁️ OKAY! 😐',
      buttonClass: 'btn-okay',
      expectedMessage: 'Okay is totally fine. Wishing you a peaceful, cozy day! ☕☁️',
    },
    sad: {
      value: 'sad',
      label: '💧 RAINING... 😢',
      buttonClass: 'btn-raining',
      shouldSwitchScreen: true,
    },
  },
};

export const pipFixtures = {
  initialState: {
    joy: 15,
    face: '૮( ꒦ິ ˙̫̮ ꒦ີ )ა',
    speech: '*Sniff*... I feel blue too...<br>Care for me?',
    joyEmoji: '☹️',
  },
  actions: {
    feed: {
      joyBoost: 25,
      face: '૮ ˶ᵔ ᵕ ᵔ˶ ა',
      speech: 'Nom nom! That berry is<br>so sweet! 🍓',
    },
    hug: {
      joyBoost: 35,
      face: '૮ ˶ˆ ﻌ ˆ˶ ა',
      speech: 'Warm squishy hugs are<br>the best! 🧸💞',
    },
    tune: {
      joyBoost: 25,
      face: '૮ ˶~ ᵕ ~˶ ა',
      speech: 'Ahhh... such a lovely<br>melody... 🎵✨',
    },
  },
  joyThresholds: {
    sad: { emoji: '☹️', max: 40 },
    neutral: { emoji: '😐', max: 75 },
    happy: { emoji: '🙂', max: 99 },
    ecstatic: { emoji: '🥰', max: 100 },
  },
  finalState: {
    joy: 100,
    face: '૮ ˶> ﻌ <˶ ა 💖',
    speech: 'Yay! We both feel better!<br>Thank you, Claire! You are loved!',
  },
};

export const screenFixtures = {
  moodScreen: {
    id: 'mood-screen',
    title: 'Daily Hug<br><span style="font-size: 1.5rem; color: #fff;">for Claire</span>',
    subtitle: 'Hello Claire!<br>How is your heart today?',
  },
  petScreen: {
    id: 'pet-screen',
    title: 'Oh No! Little Pip<br>needs a cuddle!',
    subtitle: 'Can you help cheer up Little Pip?',
  },
};

export const testScenarios = {
  happyPath: {
    description: 'User selects happy mood',
    steps: [
      { action: 'click', target: '.btn-sunny', mood: 'happy' },
      { expect: 'mood-message', toContain: 'sunny' },
    ],
  },
  okayPath: {
    description: 'User selects okay mood',
    steps: [
      { action: 'click', target: '.btn-okay', mood: 'okay' },
      { expect: 'mood-message', toContain: 'peaceful' },
    ],
  },
  sadPathWithCompletion: {
    description: 'User selects sad mood and fully cares for Pip',
    steps: [
      { action: 'click', target: '.btn-raining', mood: 'sad' },
      { expect: 'pet-screen', toBeVisible: true },
      { action: 'click', target: '[onclick="careForPip(\'hug\')" ]', repeat: 3 },
      { expect: 'joy-text', toContain: '100' },
      { expect: 'pet-face', toContain: '💖' },
    ],
  },
  resetApp: {
    description: 'User goes back from pet screen to mood screen',
    steps: [
      { action: 'click', target: '.btn-raining', mood: 'sad' },
      { action: 'click', target: '.back-btn' },
      { expect: 'mood-screen', toBeVisible: true },
      { expect: 'pet-screen', toBeHidden: true },
    ],
  },
};

export const joyCalculations = {
  scenario1: {
    description: 'Feed once and hug once',
    actions: ['feed', 'hug'],
    expectedJoy: 15 + 25 + 35, // 75
  },
  scenario2: {
    description: 'All three actions once each',
    actions: ['feed', 'hug', 'tune'],
    expectedJoy: 15 + 25 + 35 + 25, // 100
  },
  scenario3: {
    description: 'Feed three times',
    actions: ['feed', 'feed', 'feed'],
    expectedJoy: 15 + 25 + 25 + 25, // 90
  },
};
