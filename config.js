/**
 * Nikita's Sunflower Interactive Gift Card Configuration
 * ------------------------------------------------------
 * You can easily customize the Web3Forms / Formspree API endpoint,
 * add or edit questions, and modify reaction messages here.
 */

const CARD_CONFIG = {
  // Recipient Name
  recipientName: "Nikita",

  // WEB3FORMS / FORMSPREE / CUSTOM API CONFIGURATION
  // To receive answers directly in your email for FREE:
  // 1. Go to https://web3forms.com/
  // 2. Enter your email to get a free Access Key.
  // 3. Paste your Access Key below inside `accessKey`.
  submission: {
    enabled: true, // Set to true to enable live form submissions
    service: "web3forms", // Options: "web3forms", "formspree", or "custom"
    
    // Replace with your Web3Forms Access Key (e.g., "12345678-abcd-1234-abcd-123456789abc")
    accessKey: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
    
    // Or if using Formspree, paste your endpoint URL here:
    // endpoint: "https://formspree.io/f/your_form_id"
    endpoint: "https://api.web3forms.com/submit",
    
    // Subject line for the email notification you receive
    emailSubject: "🌻 Nikita answered your Sunflower Gift Card!"
  },

  // QUESTION & REACTION DEFINITIONS
  questions: [
    {
      id: 1,
      question: "Kya main tumhe bore toh nahi karta? 🌻",
      yesReaction: {
        title: "Yesss 😄🌻",
        subtitle: "I knew it! Glad I keep things entertaining for you!"
      },
      noReaction: {
        title: "Acha... 🥲🌻",
        subtitle: "Ouch... I'll take notes and try to be less boring!"
      }
    },
    {
      id: 2,
      question: "Do you like my reels? 👀",
      yesReaction: {
        title: "Okayyy, I'll take that as a compliment ❤️",
        subtitle: "Keep watching, more special ones coming soon!"
      },
      noReaction: {
        title: "Noted... 🥲",
        subtitle: "Tough critic! I'll step up my reel game."
      }
    },
    {
      id: 3,
      question: "Have you ever thought about us being more than friends? 🌻",
      yesReaction: {
        title: "💖 Warm feeling...",
        subtitle: "My heart just skipped a beat hearing that."
      },
      noReaction: {
        title: "Acha... 🥲",
        subtitle: "Honesty appreciated! Best friends forever then!"
      }
    },
    {
      id: 4,
      question: "Have you ever smiled after seeing my message? 😊",
      yesReaction: {
        title: "That makes me smile too! 😊✨",
        subtitle: "Your smile is the best reward ever."
      },
      noReaction: {
        title: "Noted... 🥲",
        subtitle: "I must draft better messages from now on!"
      }
    },
    {
      id: 5,
      question: "Have you ever waited for my text? 👀",
      yesReaction: {
        title: "Aww, you just made my day! 🥰🌻",
        subtitle: "Now you won't have to wait so long!"
      },
      noReaction: {
        title: "Fair enough... 🥲",
        subtitle: "I'll try to be faster next time!"
      }
    }
  ],

  // ANIMATION TIMINGS (in milliseconds)
  transitionDelayMs: 2200 // Time to show reaction animation before moving to next question
};

// Export configuration globally for browser script
window.CARD_CONFIG = CARD_CONFIG;
