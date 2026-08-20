# 🌻 Nikita's Interactive Sunflower Gift Card

A modern, aesthetic, mobile-first interactive digital gift card web application designed specifically for **Nikita**. Inspired by premium sunflower greeting cards, it features a blooming SVG sunflower hero, floating petal particle dynamics, glassmorphism UI cards, cute character reactions (smiling face with popping hearts & tear-wiping tissue face), and an automatic answer recording system.

---

## 🌟 Key Features

- **Sunflower Aesthetics**: Warm cream (`#FAF6EE`), Sunflower Yellow (`#FFC800`), Warm Gold (`#E68A00`), and Soft Pink accents.
- **Interactive Canvas Engine**: Real-time 60fps drifting sunflower petals, glowing sparkles, and popping heart particle bursts.
- **Cute Reaction Characters**:
  - **YES**: Smiling animated face with blushing cheeks, popping hearts & sparkles.
  - **NO**: Tear-wiping cartoon face with tissue & teardrops.
- **Automatic Answer Recording**: Sends Nikita's selections directly to your email via Web3Forms (no backend code needed!).
- **Mobile-First & Ultra Fast**: Silky smooth animations optimized for all modern phones and desktop displays.

---

## 🛠️ Project Structure

```
nikita-sunflower-card/
├── index.html       # HTML5 structure, SVG character definitions & screen wrappers
├── style.css        # CSS design system, HSL color tokens, glassmorphism, animations
├── config.js        # Central configuration (Web3Forms key, questions, reaction texts)
├── script.js        # Canvas particle engine, GSAP flow controller, response submitter
└── README.md        # Deployment & configuration documentation
```

---

## 🚀 1. How to Run Locally

You can run this project locally on your computer in multiple ways:

### Option A: Using VS Code Live Server (Recommended)
1. Open the project folder in **VS Code** (or your preferred IDE).
2. Install the **Live Server** extension.
3. Right-click `index.html` and click **"Open with Live Server"**.

### Option B: Using Node.js `npx serve`
Open your terminal inside the project directory and run:
```bash
npx -y serve .
```
Open `http://localhost:3000` in your browser.

---

## 💌 2. How to Set Up Answer Recording (Web3Forms - FREE)

To receive Nikita's answers directly in your email inbox when she completes the questions:

1. Go to [https://web3forms.com/](https://web3forms.com/).
2. Enter your email address where you want to receive notifications.
3. Click **"Create Access Key"**. Check your email inbox to copy your free **Access Key** (looks like `12345678-abcd-1234-abcd-123456789abc`).
4. Open [config.js](file:///C:/Users/priya/.gemini/antigravity-ide/scratch/nikita-sunflower-card/config.js) in your project.
5. Replace `"YOUR_WEB3FORMS_ACCESS_KEY_HERE"` with your actual key:

```javascript
submission: {
  enabled: true,
  service: "web3forms",
  accessKey: "YOUR_ACTUAL_ACCESS_KEY_HERE",
  endpoint: "https://api.web3forms.com/submit",
  emailSubject: "🌻 Nikita answered your Sunflower Gift Card!"
}
```

*Note: If no access key is provided, the card will still save answers locally to `localStorage` without interrupting the experience for Nikita.*

---

## 🌐 3. How to Deploy to Vercel (Free Hosting)

### Method 1: Using Vercel CLI (Fastest)
1. Open your terminal in the project directory.
2. Run:
   ```bash
   npx -y vercel
   ```
3. Follow the prompts (press `Enter` to accept defaults).
4. Vercel will give you a live HTTPS link (e.g. `https://nikita-sunflower-card.vercel.app`) to send to Nikita!

### Method 2: Via GitHub & Vercel Dashboard
1. Create a repository on [GitHub](https://github.com/) and push this code.
2. Go to [Vercel.com](https://vercel.com/) and sign in.
3. Click **"Add New Project"** -> Import your GitHub repository.
4. Click **Deploy**. Vercel will build and host your website instantly.

---

## ➕ 4. How to Add or Customize Questions

All questions and reactions are configured in [config.js](file:///C:/Users/priya/.gemini/antigravity-ide/scratch/nikita-sunflower-card/config.js).

To add a new question, simply add a new object to the `questions` array:

```javascript
{
  id: 6,
  question: "Will you go for coffee with me this weekend? ☕🌻",
  yesReaction: {
    title: "Yesss! Coffee date locked! ☕✨",
    subtitle: "I'll pick the place!"
  },
  noReaction: {
    title: "Maybe next time... 🥲",
    subtitle: "I'll keep trying!"
  }
}
```

The card progress counter (e.g., `1 / 6`) and progress bar will adjust automatically!

---

## 🔒 Privacy & Safety Guarantee

- **Zero Tracking**: Does NOT request device permissions, camera, contacts, or geolocation.
- **Active Consent**: Answers are only submitted when Nikita actively clicks an option.
- **Privacy Conscious**: Lightweight and clean payload structure.
