/**
 * NIKITA'S SUNFLOWER GIFT CARD - MAIN JAVASCRIPT ENGINE
 * ======================================================
 * Manages canvas particle simulation, GSAP animations,
 * interactive Q&A state machine, and response submission.
 */

document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------------------------
     1. CONFIG & STATE INITIALIZATION
     -------------------------------------------------------------------------- */
  const config = window.CARD_CONFIG || {};
  const questions = config.questions || [];
  
  let currentQuestionIndex = 0;
  let recordedAnswers = [];
  let isProcessingAnswer = false;

  /* DOM Elements */
  const welcomeScreen = document.getElementById("welcome-screen");
  const questionScreen = document.getElementById("question-screen");
  const finalScreen = document.getElementById("final-screen");

  const startBtn = document.getElementById("start-btn");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const replayBtn = document.getElementById("replay-btn");

  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  
  const questionBox = document.getElementById("question-box");
  const questionText = document.getElementById("question-text");
  const reactionBox = document.getElementById("reaction-box");
  const charHappy = document.getElementById("char-happy");
  const charSad = document.getElementById("char-sad");
  const reactionTitle = document.getElementById("reaction-title");
  const reactionSubtitle = document.getElementById("reaction-subtitle");
  const submissionStatus = document.getElementById("submission-status");

  /* --------------------------------------------------------------------------
     2. CANVAS PARTICLE ENGINE (Floating Petals & Sparkles)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById("petal-canvas");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const burstParticles = [];
  const PETAL_COUNT = 24;

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20 - Math.random() * 50;
      this.size = Math.random() * 12 + 10;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.03;
      this.sway = Math.random() * 0.02 + 0.01;
      this.swayAngle = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * 0.6 + 0.4;
      // Palette: sunflower yellow, warm gold, pinkish warm petal
      const colors = ["#FFC800", "#FFD000", "#FFAA00", "#FFD699", "#FFB7B2"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.swayAngle += this.sway;
      this.x += this.speedX + Math.sin(this.swayAngle) * 0.6;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;

      if (this.y > height + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      
      // Draw organic petal shape
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(this.size / 2, -this.size, this.size, 0);
      ctx.quadraticCurveTo(this.size / 2, this.size, 0, 0);
      ctx.fill();
      
      ctx.restore();
    }
  }

  class BurstParticle {
    constructor(x, y, isHeart = true) {
      this.x = x;
      this.y = y;
      this.isHeart = isHeart;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 2;
      this.size = Math.random() * 14 + 10;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.color = isHeart ? "#FF5E7E" : "#FFC800";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.15; // gravity
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;

      if (this.isHeart) {
        // Draw Heart
        ctx.beginPath();
        const s = this.size / 2;
        ctx.moveTo(0, s / 2);
        ctx.bezierCurveTo(-s, -s / 2, -s, -s, 0, -s);
        ctx.bezierCurveTo(s, -s, s, -s / 2, 0, s / 2);
        ctx.fill();
      } else {
        // Draw Sparkle
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Initialize petals
  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new Petal());
  }

  function triggerBurst(x, y, isHeart = true) {
    for (let i = 0; i < 20; i++) {
      burstParticles.push(new BurstParticle(x, y, isHeart));
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw background petals
    petals.forEach((p) => {
      p.update();
      p.draw();
    });

    // Update & draw dynamic particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const bp = burstParticles[i];
      bp.update();
      bp.draw();
      if (bp.alpha <= 0) {
        burstParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();


  /* --------------------------------------------------------------------------
     3. SCREEN TRANSITIONS (GSAP)
     -------------------------------------------------------------------------- */
  function showScreen(targetScreen) {
    const screens = [welcomeScreen, questionScreen, finalScreen];
    
    screens.forEach((s) => {
      if (s === targetScreen) {
        s.classList.add("active");
        gsap.fromTo(s, 
          { opacity: 0, y: 25, scale: 0.96 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        s.classList.remove("active");
      }
    });
  }


  /* --------------------------------------------------------------------------
     4. QUESTION FLOW CONTROLLER
     -------------------------------------------------------------------------- */
  function renderQuestion(index) {
    if (index >= questions.length) {
      finishCardExperience();
      return;
    }

    const q = questions[index];
    isProcessingAnswer = false;

    // Reset UI buttons & cards
    yesBtn.disabled = false;
    noBtn.disabled = false;
    
    questionBox.classList.remove("hidden");
    reactionBox.classList.add("hidden");

    // Update progress pill & bar
    const currentNum = index + 1;
    const totalNum = questions.length;
    progressText.textContent = `${currentNum} / ${totalNum}`;
    progressBar.style.width = `${(currentNum / totalNum) * 100}%`;

    // Set question text with smooth fade
    gsap.fromTo(questionText, 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 }
    );
    questionText.textContent = q.question;
  }

  function handleAnswer(answerChoice, event) {
    if (isProcessingAnswer) return;
    isProcessingAnswer = true;

    // Disable buttons during transition
    yesBtn.disabled = true;
    noBtn.disabled = true;

    const currentQ = questions[currentQuestionIndex];
    const isYes = answerChoice === "YES";

    // Record response
    recordedAnswers.push({
      questionId: currentQ.id,
      questionText: currentQ.question,
      answer: answerChoice,
      timestamp: new Date().toISOString()
    });

    // Particle Burst from button click location
    const rect = (isYes ? yesBtn : noBtn).getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;
    triggerBurst(clickX, clickY, isYes);

    // Show reaction card
    const reactionData = isYes ? currentQ.yesReaction : currentQ.noReaction;
    
    // Toggle character SVGs
    if (isYes) {
      charHappy.classList.remove("hidden");
      charSad.classList.add("hidden");
    } else {
      charHappy.classList.add("hidden");
      charSad.classList.remove("hidden");
    }

    reactionTitle.textContent = reactionData.title;
    reactionSubtitle.textContent = reactionData.subtitle;

    // Animate view transition to reaction card
    gsap.to(questionBox, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      onComplete: () => {
        questionBox.classList.add("hidden");
        questionBox.style.opacity = 1;
        questionBox.style.transform = "none";
        
        reactionBox.classList.remove("hidden");
        gsap.fromTo(reactionBox,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
        );
      }
    });

    // Schedule next question transition
    transitionTimer = setTimeout(() => {
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    }, config.transitionDelayMs || 2200);
  }


  /* --------------------------------------------------------------------------
     5. FINAL SCREEN & ANSWER SUBMISSION SERVICE
     -------------------------------------------------------------------------- */
  function finishCardExperience() {
    showScreen(finalScreen);

    // Trigger grand burst celebration
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        triggerBurst(width * (0.2 + Math.random() * 0.6), height * (0.3 + Math.random() * 0.4), true);
      }, i * 300);
    }

    // Submit answers securely to Web3Forms / Formspree / Custom Webhook
    sendRecordedAnswers();
  }

  async function sendRecordedAnswers() {
    console.log("🌻 Recorded Answers for Nikita:", recordedAnswers);

    // Save locally in browser storage as safety backup
    try {
      localStorage.setItem("nikita_sunflower_answers", JSON.stringify(recordedAnswers));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }

    const subConfig = config.submission || {};
    if (!subConfig.enabled) {
      return;
    }

    // Prepare human-readable payload
    const formattedData = {
      access_key: subConfig.accessKey,
      subject: subConfig.emailSubject || `🌻 Nikita's Sunflower Gift Card Responses`,
      from_name: `${config.recipientName || 'Nikita'}'s Gift Card`,
      recipient_name: config.recipientName || "Nikita",
      submission_time: new Date().toLocaleString()
    };

    // Add each question answer cleanly
    recordedAnswers.forEach((ans, idx) => {
      formattedData[`Q${idx + 1}_${ans.questionText}`] = ans.answer;
    });

    // Attempt Web3Forms POST request
    try {
      if (subConfig.accessKey && subConfig.accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
        const response = await fetch(subConfig.endpoint || "https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formattedData)
        });

        const result = await response.json();
        if (result.success) {
          console.log("✅ Answers successfully delivered via email/webhook!");
          if (submissionStatus) {
            submissionStatus.classList.remove("hidden");
          }
        } else {
          console.warn("Form service warning:", result);
        }
      } else {
        console.log("ℹ️ Web3Forms Access Key not set yet in config.js. Form submission skipped.");
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
    }
  }


  let transitionTimer = null;

  /* --------------------------------------------------------------------------
     6. EVENT LISTENERS
     -------------------------------------------------------------------------- */
  startBtn.addEventListener("click", () => {
    if (transitionTimer) clearTimeout(transitionTimer);
    currentQuestionIndex = 0;
    recordedAnswers = [];
    showScreen(questionScreen);
    renderQuestion(0);
  });

  yesBtn.addEventListener("click", (e) => handleAnswer("YES", e));
  noBtn.addEventListener("click", (e) => handleAnswer("NO", e));

  replayBtn.addEventListener("click", () => {
    if (transitionTimer) clearTimeout(transitionTimer);
    currentQuestionIndex = 0;
    recordedAnswers = [];
    isProcessingAnswer = false;
    showScreen(welcomeScreen);
  });

});
