/**
 * ===================================================================
 * WEBSITE ULANG TAHUN INTERAKTIF KE-57 UNTUK ABI (18 NOVEMBER 2026)
 * ===================================================================
 * 
 * PANDUAN PENGATURAN CEPAT:
 * Anda bisa mengubah teks, nama, foto, dan lagu di bagian CONFIG berikut.
 */

const CONFIG = {
  // Nama pengirim (akan tampil di kartu hadiah dan tanda tangan surat)
  NAMA: "Anakmu",

  // Panggilan untuk ayah
  ABI_NAME: "Abi",

  // Tanggal lahir & target ulang tahun
  BIRTH_DATE: "1969-11-18", // 18 November 1969
  TARGET_DATE_DISPLAY: "18 November 1969 — 18 November 2026",
  TARGET_AGE: 57,

  // Teks ucapan surat utama (Tahap 3 & Panel Baca Surat Lagi)
  LETTER_TEXT: {
    title: "Selamat Ulang Tahun, Abi 🎉",
    date: "18 November 1969 — 18 November 2026",
    p1: "Abi, terima kasih sudah menjadi tiang yang tak pernah goyah untuk keluarga kita. Terima kasih untuk setiap lelah yang tak pernah Abi keluhkan, dan untuk teladan yang Abi berikan tanpa banyak kata.",
    p2: "Semoga di usia ke-57 ini, Allah limpahkan kesehatan, ketenangan, dan keberkahan di setiap langkah Abi. Kami sayang Abi, selalu."
  },

  // Daftar Foto Kenangan untuk Galeri Polaroid (Sesuai foto asli Abi)
  PHOTOS: [
    { src: "assets/photos/satu.jpeg", cap: "Hari yang indah bersama Abi" },
    { src: "assets/photos/dua.jpeg", cap: "Dedikasi & kebanggaan Abi" },
    { src: "assets/photos/tiga.jpeg", cap: "Senyum ceria cucu & anak tersayang" },
    { src: "assets/photos/empat.jpeg", cap: "Keluarga tercinta" },
    { src: "assets/photos/lima.png", cap: "Tiang kokoh keluarga kita" }
  ],

  // 6 Kartu Doa (Bisa Di-flip)
  DOA_LIST: [
    {
      icon: "🌿",
      title: "Kesehatan",
      text: "Semoga Allah menjaga tubuh Abi selalu sehat, kuat, dan bugar."
    },
    {
      icon: "🌙",
      title: "Rezeki",
      text: "Semoga rezeki Abi selalu halal, lapang, dan penuh berkah."
    },
    {
      icon: "⏳",
      title: "Umur Berkah",
      text: "Semoga sisa umur Abi penuh manfaat dan kebaikan."
    },
    {
      icon: "🏡",
      title: "Keluarga",
      text: "Semoga keluarga kita selalu rukun, hangat, dan saling menjaga."
    },
    {
      icon: "🤍",
      title: "Ketenangan",
      text: "Semoga hati Abi selalu damai, tenang, dan penuh syukur."
    },
    {
      icon: "🕌",
      title: "Husnul Khatimah",
      text: "Semoga kita semua dikumpulkan kembali di surga-Nya."
    }
  ],

  // File Musik (Loop)
  MUSIC_FILE: "assets/music/Lagu.m4a"
};

/* ===================================================================
   WEB AUDIO API: SINTESIS SUARA MANDIRI (TANPA FILE AUDIO EKSTERNAL)
   Suara petasan, kembang api, lilin, flip kartu, dan lonceng ucapan.
   =================================================================== */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Efek suara retakan segel lilin (crisp snap & crumble)
  playSealCrack() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  // Efek suara rentetan petasan & kembang api (firecrackers)
  playFirecrackerBurst(count = 6) {
    if (this.isMuted || !this.ctx) return;
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 1.5;
      setTimeout(() => {
        this.playSingleCrack();
      }, delay * 1000);
    }
  }

  playSingleCrack() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // White noise buffer
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800 + Math.random() * 1200, now);
      filter.Q.setValueAtTime(3, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.15);

      // Low boom
      const boom = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boom.type = 'triangle';
      boom.frequency.setValueAtTime(140, now);
      boom.frequency.exponentialRampToValueAtTime(35, now + 0.2);
      boomGain.gain.setValueAtTime(0.3, now);
      boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      boom.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boom.start(now);
      boom.stop(now + 0.22);
    } catch (e) {}
  }

  // Efek suara membalik kartu doa (whoosh)
  playCardFlip() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // Efek suara hembusan angin lilin (whoosh)
  playBlowWind() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(200, now + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.36);
    } catch (e) {}
  }

  // Efek suara melodi bahagia / unlock harp chime
  playCelebrationChime() {
    if (this.isMuted || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          if (!this.ctx) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.65);
        } catch (e) {}
      }, idx * 110);
    });
  }

  // Suara ketukan tombol halus
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

const sounds = new SoundEngine();

/* ===================================================================
   CANVAS AMBIENT: BINTANG, HATI, & BALON MELAYANG DI LATAR BELAKANG
   =================================================================== */
class AmbientBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.particles = []; // Hati & balon
    this.width = 0;
    this.height = 0;
    this.animId = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initElements();
    this.loop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  initElements() {
    // Buat bintang berkelap-kelip
    const starCount = Math.min(Math.floor((this.width * this.height) / 12000), 70);
    this.stars = [];
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.6 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Buat balon & hati melayang pelan
    const particleCount = this.reducedMotion ? 4 : 14;
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  createParticle(randomY = false) {
    const isBalloon = Math.random() > 0.45;
    // Warna lembut & hangat agar tidak menutupi teks saat melayang
    const colors = ['#f7d78a', '#f6ecd6', '#eed7a1', '#e5b0b7', '#d9b25f'];
    return {
      type: isBalloon ? 'balloon' : 'heart',
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + 40,
      size: isBalloon ? Math.random() * 8 + 14 : Math.random() * 8 + 10,
      speedY: Math.random() * 0.35 + 0.25,
      swaySpeed: Math.random() * 0.015 + 0.008,
      swayDist: Math.random() * 20 + 12,
      phase: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.12 + 0.08 // Transparan halus di latar belakang
    };
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Gambar Bintang
    for (let s of this.stars) {
      s.phase += s.speed;
      const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(246, 236, 214, ${currentAlpha})`;
      this.ctx.fill();
    }

    // 2. Gambar Balon & Hati Melayang
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.y -= p.speedY;
      p.phase += p.swaySpeed;
      const drawX = p.x + Math.sin(p.phase) * p.swayDist;

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;

      if (p.type === 'balloon') {
        // Balon lonjong
        this.ctx.beginPath();
        this.ctx.ellipse(drawX, p.y, p.size * 0.75, p.size, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();

        // Tali balon halus meliuk
        this.ctx.beginPath();
        this.ctx.moveTo(drawX, p.y + p.size);
        this.ctx.quadraticCurveTo(drawX + Math.sin(p.phase) * 6, p.y + p.size + 15, drawX, p.y + p.size + 30);
        this.ctx.strokeStyle = 'rgba(217, 178, 95, 0.4)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      } else {
        // Hati melayang
        this.drawHeart(drawX, p.y, p.size, p.color);
      }

      this.ctx.restore();

      // Reset jika sudah lewat atas layar
      if (p.y < -50) {
        this.particles[i] = this.createParticle(false);
      }
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }

  drawHeart(x, y, size, color) {
    this.ctx.beginPath();
    const topCurveHeight = size * 0.3;
    this.ctx.moveTo(x, y + topCurveHeight);
    this.ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    this.ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.3, x, y + size);
    this.ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.3, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    this.ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}

/* ===================================================================
   CANVAS FOREGROUND: KEMBANG API & KONFETI JATUH
   =================================================================== */
class FXEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.confettiPieces = [];
    this.fireworkSparks = [];
    this.width = 0;
    this.height = 0;
    this.isActive = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  burstFirework(x, y, colorPalette) {
    const sparkCount = 45;
    const colors = colorPalette || ['#ffd700', '#ffae19', '#ff4d4d', '#ffffff', '#e098a0', '#7a1f2b'];
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 5.5 + 2.5;
      this.fireworkSparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        gravity: 0.1,
        radius: Math.random() * 2.2 + 1.2
      });
    }
  }

  burstConfetti(count = 70) {
    const colors = ['#d9b25f', '#f3cf7a', '#7a1f2b', '#f6ecd6', '#ffffff', '#e76f51'];
    for (let i = 0; i < count; i++) {
      this.confettiPieces.push({
        x: Math.random() * this.width,
        y: -20 - Math.random() * 50,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3.5 + 2.5,
        w: Math.random() * 8 + 6,
        h: Math.random() * 5 + 4,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render & update Sparks
    for (let i = this.fireworkSparks.length - 1; i >= 0; i--) {
      const s = this.fireworkSparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += s.gravity;
      s.vx *= 0.98;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        this.fireworkSparks.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, s.alpha);
      this.ctx.fillStyle = s.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Render & update Confetti
    for (let i = this.confettiPieces.length - 1; i >= 0; i--) {
      const c = this.confettiPieces[i];
      c.x += c.vx;
      c.y += c.vy;
      c.rot += c.rotSpeed;

      if (c.y > this.height + 30) {
        this.confettiPieces.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rot * Math.PI) / 180);
      this.ctx.fillStyle = c.color;
      this.ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }

  // Tembakkan serangkaian kembang api dalam durasi tertentu
  launchFireworksSequence(durationMs = 4000, count = 8) {
    const interval = durationMs / count;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const x = Math.random() * (this.width * 0.7) + this.width * 0.15;
        const y = Math.random() * (this.height * 0.45) + this.height * 0.15;
        this.burstFirework(x, y);
        sounds.playSingleCrack();
      }, i * interval);
    }
  }
}

/* ===================================================================
   MANAJEMEN MUSIK LATAR & AUDIO CONTROLLER
   =================================================================== */
class MusicManager {
  constructor(audioElem, toggleBtn) {
    this.audio = audioElem;
    this.btn = toggleBtn;
    this.isPlaying = false;
    this.setupListeners();
  }

  setupListeners() {
    this.btn.addEventListener('click', () => this.toggleMusic());

    // Tangani jika file audio tidak ditemukan (404) atau tidak didukung
    this.audio.addEventListener('error', (e) => {
      console.warn("File musik latar belum ada atau gagal dimuat di assets/music/Lagu.m4a. Website tetap berjalan lancar.", e);
      this.btn.classList.add('is-muted');
      this.isPlaying = false;
    });
  }

  start() {
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.btn.classList.remove('is-muted');
    }).catch((err) => {
      console.log("Autoplay diblokir browser atau file audio belum siap:", err);
      this.isPlaying = false;
      this.btn.classList.add('is-muted');
    });
  }

  toggleMusic() {
    sounds.playClick();
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.btn.classList.add('is-muted');
      sounds.isMuted = true;
    } else {
      sounds.isMuted = false;
      sounds.init();
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.btn.classList.remove('is-muted');
      }).catch(() => {
        this.isPlaying = false;
        this.btn.classList.add('is-muted');
      });
    }
  }
}

/* ===================================================================
   APLIKASI UTAMA (ORCHESTRATOR)
   =================================================================== */
class BirthdayApp {
  constructor() {
    this.ambient = null;
    this.fx = null;
    this.music = null;

    // State Tracking
    this.visitedPanels = new Set();
    this.isGiftUnlocked = false;
    this.currentActivePanel = null;
    this.isTyping = false;
    this.typewriterTimeouts = [];

    // DOM Elements Cache
    this.stageEnvelope = document.getElementById('stage-envelope');
    this.stageLetter = document.getElementById('stage-letter');
    this.stageMain = document.getElementById('stage-main');

    this.envelope = document.getElementById('envelope');
    this.waxSeal = document.getElementById('wax-seal');

    this.typedTitle = document.getElementById('typed-letter-title');
    this.typedDate = document.getElementById('letter-date-display');
    this.typedP1 = document.getElementById('typed-letter-p1');
    this.typedP2 = document.getElementById('typed-letter-p2');
    this.skipTypingBtn = document.getElementById('skip-typing-btn');
    this.letterNextBtn = document.getElementById('letter-next-btn');

    this.countupAge = document.getElementById('countup-age');
    this.totalDaysCount = document.getElementById('total-days-count');
    this.heroAbiName = document.getElementById('hero-abi-name');

    this.sideDock = document.getElementById('side-dock');
    this.dockButtons = document.querySelectorAll('.dock-btn');
    this.giftBtn = document.getElementById('dock-btn-gift');
    this.giftIcon = document.getElementById('gift-btn-icon');
    this.giftLockBadge = document.getElementById('gift-lock-badge');
    this.giftTooltipText = document.getElementById('gift-tooltip-text');

    this.panelBackdrop = document.getElementById('modal-panel-backdrop');
    this.panelCard = document.getElementById('panel-card');
    this.closePanelBtn = document.getElementById('close-panel-btn');
    this.mobileToast = document.getElementById('mobile-dock-toast');

    this.init();
  }

  init() {
    // 1. Inisialisasi Canvas
    const ambCanvas = document.getElementById('ambient-canvas');
    if (ambCanvas) this.ambient = new AmbientBackground(ambCanvas);

    const fxCanvas = document.getElementById('fx-canvas');
    if (fxCanvas) this.fx = new FXEngine(fxCanvas);

    // 2. Inisialisasi Musik
    const audioEl = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    this.music = new MusicManager(audioEl, musicBtn);

    // 3. Terapkan Nama & Tanggal dari CONFIG
    if (this.heroAbiName) this.heroAbiName.textContent = CONFIG.ABI_NAME;
    if (this.typedDate) this.typedDate.textContent = CONFIG.TARGET_DATE_DISPLAY;

    const letterAgainDate = document.getElementById('letter-again-date');
    if (letterAgainDate) letterAgainDate.textContent = CONFIG.TARGET_DATE_DISPLAY;

    const letterAgainTitle = document.getElementById('letter-again-title');
    if (letterAgainTitle) letterAgainTitle.textContent = CONFIG.LETTER_TEXT.title;

    const letterAgainP1 = document.getElementById('letter-again-p1');
    if (letterAgainP1) letterAgainP1.textContent = CONFIG.LETTER_TEXT.p1;

    const letterAgainP2 = document.getElementById('letter-again-p2');
    if (letterAgainP2) letterAgainP2.textContent = CONFIG.LETTER_TEXT.p2;

    const letterAgainSign = document.getElementById('letter-again-signature');
    if (letterAgainSign) letterAgainSign.textContent = CONFIG.NAMA;

    const giftAuthorName = document.getElementById('gift-author-name');
    if (giftAuthorName) giftAuthorName.textContent = CONFIG.NAMA;

    // 4. Hitung Hari Otomatis
    this.calculateLifeStats();

    // 5. Setup Event Listeners
    this.setupEnvelopeStage();
    this.setupLetterStage();
    this.setupMainRoomAndDock();
    this.setupPanelMemories();
    this.setupPanelPrayers();
    this.setupPanelCake();
    this.setupPanelGift();
    this.setupGlobalShortcuts();
  }

  /* -------------------------------------------------------------
     TAHAP 1: AMPLOP PEMBUKA
     ------------------------------------------------------------- */
  setupEnvelopeStage() {
    const openEnvelope = () => {
      if (this.envelope.classList.contains('is-opening')) return;
      sounds.init();
      sounds.playSealCrack();
      this.music.start();

      this.envelope.classList.add('is-opening');

      // TAHAP 2: Efek Petasan & Kembang Api
      setTimeout(() => {
        sounds.playFirecrackerBurst(7);
        if (this.fx) {
          this.fx.launchFireworksSequence(3200, 7);
          this.fx.burstConfetti(80);
        }
      }, 350);

      // Transisi ke TAHAP 3: Surat Mengetik
      setTimeout(() => {
        this.switchStage(this.stageEnvelope, this.stageLetter);
        this.startTypewriterLetter();
      }, 1600);
    };

    this.envelope.addEventListener('click', openEnvelope);
    this.envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  /* -------------------------------------------------------------
     TAHAP 3: SURAT VINTAGE DENGAN EFEK MENGETIK
     ------------------------------------------------------------- */
  setupLetterStage() {
    this.skipTypingBtn.addEventListener('click', () => {
      sounds.playClick();
      this.skipTypewriter();
    });

    this.letterNextBtn.addEventListener('click', () => {
      sounds.playClick();
      this.switchStage(this.stageLetter, this.stageMain);
      this.startCountUp();
      if (this.fx) {
        this.fx.burstConfetti(50);
      }
    });
  }

  startTypewriterLetter() {
    this.isTyping = true;
    this.typewriterTimeouts = [];

    this.typedTitle.textContent = '';
    this.typedP1.textContent = '';
    this.typedP2.textContent = '';
    this.letterNextBtn.classList.add('hidden');
    this.skipTypingBtn.classList.remove('hidden');

    const titleText = CONFIG.LETTER_TEXT.title;
    const p1Text = CONFIG.LETTER_TEXT.p1;
    const p2Text = CONFIG.LETTER_TEXT.p2;

    let totalDelay = 200;

    // 1. Ketik Judul
    for (let i = 0; i < titleText.length; i++) {
      const t = setTimeout(() => {
        this.typedTitle.textContent += titleText[i];
      }, totalDelay);
      this.typewriterTimeouts.push(t);
      totalDelay += 40;
    }

    totalDelay += 300;

    // 2. Ketik Paragraf 1
    for (let i = 0; i < p1Text.length; i++) {
      const t = setTimeout(() => {
        this.typedP1.textContent += p1Text[i];
      }, totalDelay);
      this.typewriterTimeouts.push(t);
      totalDelay += 28;
    }

    totalDelay += 350;

    // 3. Ketik Paragraf 2
    for (let i = 0; i < p2Text.length; i++) {
      const t = setTimeout(() => {
        this.typedP2.textContent += p2Text[i];
      }, totalDelay);
      this.typewriterTimeouts.push(t);
      totalDelay += 28;
    }

    // 4. Selesai
    const endTimeout = setTimeout(() => {
      this.finishTypewriter();
    }, totalDelay + 200);
    this.typewriterTimeouts.push(endTimeout);
  }

  skipTypewriter() {
    this.typewriterTimeouts.forEach(t => clearTimeout(t));
    this.typewriterTimeouts = [];
    this.typedTitle.textContent = CONFIG.LETTER_TEXT.title;
    this.typedP1.textContent = CONFIG.LETTER_TEXT.p1;
    this.typedP2.textContent = CONFIG.LETTER_TEXT.p2;
    this.finishTypewriter();
  }

  finishTypewriter() {
    this.isTyping = false;
    this.skipTypingBtn.classList.add('hidden');
    this.letterNextBtn.classList.remove('hidden');
  }

  /* -------------------------------------------------------------
     TAHAP 4: RUANG UTAMA & DOCK SISI LAYAR
     ------------------------------------------------------------- */
  calculateLifeStats() {
    const birth = new Date(CONFIG.BIRTH_DATE);
    const now = new Date();
    const diffTime = Math.abs(now - birth);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Format dengan pemisah titik ribuan (misal: 20.817)
    const formattedDays = diffDays.toLocaleString('id-ID');
    if (this.totalDaysCount) {
      this.totalDaysCount.textContent = formattedDays;
    }
  }

  startCountUp() {
    const targetAge = CONFIG.TARGET_AGE;
    const duration = 1800;
    const start = performance.now();

    const frame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out quadratic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * targetAge);
      if (this.countupAge) this.countupAge.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        if (this.countupAge) this.countupAge.textContent = targetAge;
      }
    };
    requestAnimationFrame(frame);
  }

  setupMainRoomAndDock() {
    this.dockButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        const panelId = btn.getAttribute('data-panel');
        if (btn.classList.contains('dock-btn-locked')) {
          this.showMobileToast("Kado masih terkunci! Buka Kenangan, Doa, & Kue dulu ya Abi 🎁");
          return;
        }

        // Tampilkan toast singkat pada layar HP saat ditekan
        const tooltip = btn.querySelector('.dock-tooltip');
        if (tooltip) {
          this.showMobileToast(tooltip.textContent);
        }

        this.openPanel(panelId, btn);
      });
    });

    // Tutup panel
    this.closePanelBtn.addEventListener('click', () => {
      sounds.playClick();
      this.closePanel();
    });

    this.panelBackdrop.addEventListener('click', (e) => {
      if (e.target === this.panelBackdrop) {
        sounds.playClick();
        this.closePanel();
      }
    });
  }

  showMobileToast(text) {
    if (!this.mobileToast) return;
    this.mobileToast.textContent = text;
    this.mobileToast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.mobileToast.classList.remove('show');
    }, 1800);
  }

  openPanel(panelId, triggeredBtn) {
    // Sembunyikan panel-panel sebelumnya
    const allPanels = document.querySelectorAll('.panel-content');
    allPanels.forEach(p => p.classList.add('hidden'));

    // Tampilkan panel target
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
    }

    // Aktifkan backdrop & modal
    this.panelBackdrop.classList.add('active');
    this.currentActivePanel = panelId;

    // Update state tombol dock
    this.dockButtons.forEach(b => b.classList.remove('is-active'));
    if (triggeredBtn) {
      triggeredBtn.classList.add('is-active');
      this.markPanelVisited(triggeredBtn, panelId);
    }
  }

  closePanel() {
    this.panelBackdrop.classList.remove('active');
    this.dockButtons.forEach(b => b.classList.remove('is-active'));
    this.currentActivePanel = null;
  }

  markPanelVisited(btn, panelId) {
    // Hilangkan badge 'Baru' & animasi pulse
    btn.classList.remove('pulse', 'has-badge');
    const newBadge = btn.querySelector('.new-badge');
    if (newBadge) newBadge.classList.add('hidden');

    // Tampilkan centang (✓)
    const checkBadge = btn.querySelector('.check-badge');
    if (checkBadge) checkBadge.classList.remove('hidden');

    this.visitedPanels.add(panelId);

    // Cek jika 3 tombol awal (Kenangan, Doa, Kue) sudah dibuka
    if (!this.isGiftUnlocked) {
      const required = ['panel-memories', 'panel-prayers', 'panel-cake'];
      const allDone = required.every(p => this.visitedPanels.has(p));
      if (allDone) {
        this.unlockGiftButton();
      }
    }
  }

  unlockGiftButton() {
    this.isGiftUnlocked = true;
    this.giftBtn.removeAttribute('disabled');
    this.giftBtn.setAttribute('aria-disabled', 'false');
    this.giftBtn.setAttribute('aria-label', 'Buka Hadiah Spesial untuk Abi');
    this.giftBtn.classList.remove('dock-btn-locked');
    this.giftBtn.classList.add('unlocking');

    if (this.giftIcon) this.giftIcon.textContent = '🎁';
    if (this.giftLockBadge) this.giftLockBadge.classList.add('hidden');
    if (this.giftTooltipText) this.giftTooltipText.textContent = 'Buka Hadiah Spesial ✨';

    sounds.playCelebrationChime();
    if (this.fx) {
      this.fx.burstConfetti(60);
      this.fx.burstFirework(window.innerWidth * 0.8, window.innerHeight * 0.5);
    }

    this.showMobileToast("🎉 Kado spesial untuk Abi sudah terbuka!");
  }

  /* -------------------------------------------------------------
     PANEL 1: KENANGAN (POLAROID CAROUSEL & SWIPE)
     ------------------------------------------------------------- */
  setupPanelMemories() {
    const carousel = document.getElementById('polaroid-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prev-photo-btn');
    const nextBtn = document.getElementById('next-photo-btn');

    if (!carousel) return;

    // Render daftar polaroid dari CONFIG.PHOTOS (atau placeholder jika kosong)
    carousel.innerHTML = '';
    dotsContainer.innerHTML = '';

    const defaultPlaceholders = [
      { src: "assets/photos/foto1.jpg", cap: "Masa muda Abi" },
      { src: "assets/photos/foto2.jpg", cap: "Bersama keluarga" },
      { src: "assets/photos/foto3.jpg", cap: "Hari yang indah" },
      { src: "assets/photos/foto4.jpg", cap: "Senyum Abi" },
      { src: "assets/photos/foto5.jpg", cap: "Kenangan favorit" }
    ];

    const photosToRender = (CONFIG.PHOTOS && CONFIG.PHOTOS.length > 0) ? CONFIG.PHOTOS : defaultPlaceholders;

    const rotations = [-2.5, 1.8, -1.2, 2.2, -1.5];

    photosToRender.forEach((photo, index) => {
      const rot = rotations[index % rotations.length];
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.style.setProperty('--rot', `${rot}deg`);
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Foto kenangan: ${photo.cap}`);

      // Gambar dengan fallback jika belum ada
      const imgWrap = document.createElement('div');
      imgWrap.className = 'polaroid-img-wrapper';

      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.cap;
      img.loading = 'lazy';

      // Fallback placeholder jika file gambar tidak ditemukan
      img.onerror = () => {
        img.remove();
        const placeholder = document.createElement('div');
        placeholder.className = 'polaroid-placeholder';
        placeholder.innerHTML = `
          <span class="placeholder-icon">📸</span>
          <span class="placeholder-tag">Kenangan Indah</span>
        `;
        imgWrap.appendChild(placeholder);
      };

      imgWrap.appendChild(img);

      const caption = document.createElement('p');
      caption.className = 'polaroid-caption';
      caption.textContent = photo.cap;

      card.appendChild(imgWrap);
      card.appendChild(caption);

      // Lightbox click
      card.addEventListener('click', () => {
        sounds.playClick();
        this.openLightbox(photo);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(photo);
        }
      });

      carousel.appendChild(card);

      // Dots Indicator
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dotsContainer.appendChild(dot);
    });

    // Update Dots saat Scroll / Swipe
    carousel.addEventListener('scroll', () => {
      const cards = carousel.querySelectorAll('.polaroid-card');
      const scrollPos = carousel.scrollLeft;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 18 : 260;
      const activeIdx = Math.round(scrollPos / cardWidth);

      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
      });
    }, { passive: true });

    // Tombol Navigasi Next / Prev
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        sounds.playClick();
        carousel.scrollBy({ left: -260, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sounds.playClick();
        carousel.scrollBy({ left: 260, behavior: 'smooth' });
      });
    }

    // Lightbox Closer
    const lightbox = document.getElementById('photo-lightbox');
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    const lightboxOverlay = document.getElementById('lightbox-overlay');

    const closeLightbox = () => {
      if (lightbox) lightbox.classList.add('hidden');
    };

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  }

  openLightbox(photo) {
    const lightbox = document.getElementById('photo-lightbox');
    const container = document.getElementById('lightbox-img-container');
    const caption = document.getElementById('lightbox-caption');

    if (!lightbox || !container || !caption) return;

    container.innerHTML = '';
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.cap;

    img.onerror = () => {
      img.remove();
      container.innerHTML = `
        <div class="polaroid-placeholder" style="height:100%; width:100%;">
          <span class="placeholder-icon" style="font-size:3.5rem;">📸</span>
          <span class="placeholder-tag" style="font-size:1.1rem; color:#ffd700;">${photo.cap}</span>
        </div>
      `;
    };

    container.appendChild(img);
    caption.textContent = photo.cap;
    lightbox.classList.remove('hidden');
  }

  /* -------------------------------------------------------------
     PANEL 2: DOA (6 KARTU 3D FLIP)
     ------------------------------------------------------------- */
  setupPanelPrayers() {
    const grid = document.getElementById('prayers-grid');
    const flipAllBtn = document.getElementById('flip-all-prayers-btn');
    if (!grid) return;

    grid.innerHTML = '';

    CONFIG.DOA_LIST.forEach((doa, idx) => {
      const card = document.createElement('div');
      card.className = 'prayer-flip-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Doa ${doa.title}. Ketuk untuk membalik.`);

      card.innerHTML = `
        <div class="prayer-card-inner">
          <div class="prayer-card-front">
            <div class="prayer-icon-circle">${doa.icon}</div>
            <h3 class="prayer-card-title">${doa.title}</h3>
            <span class="prayer-tap-hint">Ketuk untuk buka ✨</span>
          </div>
          <div class="prayer-card-back">
            <div class="prayer-back-flourish">❦</div>
            <p class="prayer-text">"${doa.text}"</p>
          </div>
        </div>
      `;

      const toggleFlip = () => {
        sounds.playCardFlip();
        card.classList.toggle('is-flipped');
      };

      card.addEventListener('click', toggleFlip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip();
        }
      });

      grid.appendChild(card);
    });

    if (flipAllBtn) {
      flipAllBtn.addEventListener('click', () => {
        sounds.playCelebrationChime();
        const cards = grid.querySelectorAll('.prayer-flip-card');
        const anyUnflipped = Array.from(cards).some(c => !c.classList.contains('is-flipped'));
        cards.forEach((c, idx) => {
          setTimeout(() => {
            if (anyUnflipped) {
              c.classList.add('is-flipped');
            } else {
              c.classList.remove('is-flipped');
            }
          }, idx * 60);
        });
      });
    }
  }

  /* -------------------------------------------------------------
     PANEL 3: KUE ULANG TAHUN & TIUP LILIN
     ------------------------------------------------------------- */
  setupPanelCake() {
    const candles = document.querySelectorAll('.candle');
    const blowMicBtn = document.getElementById('blow-mic-btn');
    const micStatus = document.getElementById('mic-status-text');
    const wishBanner = document.getElementById('cake-wish-banner');
    const relightBtn = document.getElementById('relight-candles-btn');

    // 1. Ketuk Lilin Satu per Satu
    candles.forEach(candle => {
      const extinguish = () => {
        if (candle.classList.contains('is-blown')) return;
        sounds.playBlowWind();
        candle.classList.add('is-blown');
        this.checkAllCandlesBlown();
      };

      candle.addEventListener('click', extinguish);
      candle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          extinguish();
        }
      });
    });

    // 2. Tombol Tiup Lilin via Mikrofon / Otomatis Fallback
    if (blowMicBtn) {
      blowMicBtn.addEventListener('click', () => {
        sounds.playClick();
        this.startMicrophoneBlowDetection(micStatus);
      });
    }

    // 3. Nyalakan Lilin Lagi
    if (relightBtn) {
      relightBtn.addEventListener('click', () => {
        sounds.playCelebrationChime();
        candles.forEach(c => c.classList.remove('is-blown'));
        if (wishBanner) wishBanner.classList.add('hidden');
        const cakeControls = document.getElementById('cake-controls');
        if (cakeControls) cakeControls.classList.remove('hidden');
        if (micStatus) {
          micStatus.textContent = "Bisa langsung ditiup ke lubang mikrofon HP atau ketuk tombol di atas!";
        }
      });
    }
  }

  startMicrophoneBlowDetection(statusElem) {
    if (statusElem) {
      statusElem.textContent = "Mendengarkan hembusan nafas Abi... Dekatkan bibir ke mic lalu tiup! 🎤";
    }

    let micStream = null;
    let audioContext = null;
    let analyser = null;
    let fallbackTimeout = null;
    let isFinished = false;

    // Fallback: jika mic ditolak atau tidak ada tiupan dalam 7 detik, tiup lilin otomatis satu per satu
    fallbackTimeout = setTimeout(() => {
      if (!isFinished) {
        cleanup();
        if (statusElem) statusElem.textContent = "Tiupan angin hangat memadamkan lilin... 🍃";
        this.autoBlowAllCandles();
      }
    }, 7000);

    const cleanup = () => {
      isFinished = true;
      clearTimeout(fallbackTimeout);
      if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
      }
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(() => {});
      }
    };

    // Minta izin mikrofon
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          micStream = stream;
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const checkBlowVolume = () => {
            if (isFinished) return;
            analyser.getByteFrequencyData(dataArray);

            // Hitung rata-rata volume suara tiupan (biasanya frekuensi rendah-menengah bergejolak)
            let sum = 0;
            for (let i = 0; i < 20; i++) {
              sum += dataArray[i];
            }
            const average = sum / 20;

            // Ambang batas tiupan nafas
            if (average > 65) {
              cleanup();
              if (statusElem) statusElem.textContent = "Hembusan nafas Abi terdeteksi! Lilin padam... 🌬️";
              this.autoBlowAllCandles();
              return;
            }

            requestAnimationFrame(checkBlowVolume);
          };

          checkBlowVolume();
        })
        .catch(err => {
          console.log("Akses mikrofon tidak diizinkan atau tidak didukung:", err);
          cleanup();
          this.autoBlowAllCandles();
        });
    } else {
      cleanup();
      this.autoBlowAllCandles();
    }
  }

  autoBlowAllCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach((c, idx) => {
      setTimeout(() => {
        sounds.playBlowWind();
        c.classList.add('is-blown');
        if (idx === candles.length - 1) {
          this.checkAllCandlesBlown();
        }
      }, idx * 280);
    });
  }

  checkAllCandlesBlown() {
    const candles = document.querySelectorAll('.candle');
    const allBlown = Array.from(candles).every(c => c.classList.contains('is-blown'));

    if (allBlown) {
      const banner = document.getElementById('cake-wish-banner');
      if (banner) banner.classList.remove('hidden');
      const cakeControls = document.getElementById('cake-controls');
      if (cakeControls) cakeControls.classList.add('hidden');

      sounds.playCelebrationChime();
      if (this.fx) {
        this.fx.burstConfetti(100);
        this.fx.launchFireworksSequence(3500, 8);
      }
    }
  }

  /* -------------------------------------------------------------
     PANEL 4: HADIAH PENUTUP (KOTAK KADO & PESAN SPESIAL)
     ------------------------------------------------------------- */
  setupPanelGift() {
    const giftBox = document.getElementById('gift-interactive-box');
    const secretMsg = document.getElementById('gift-secret-message');
    const hint = document.getElementById('gift-tap-hint');
    const restartBtn = document.getElementById('restart-flow-btn');

    if (giftBox) {
      const openGift = () => {
        if (giftBox.classList.contains('is-opened')) return;
        sounds.playCelebrationChime();
        giftBox.classList.add('is-opened');

        if (hint) hint.classList.add('hidden');
        if (secretMsg) secretMsg.classList.remove('hidden');

        if (this.fx) {
          this.fx.burstConfetti(120);
          this.fx.launchFireworksSequence(4000, 10);
        }
      };

      giftBox.addEventListener('click', openGift);
      giftBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openGift();
        }
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        sounds.playClick();
        if (confirm("Ulangi perjalanan perayaan dari awal?")) {
          window.location.reload();
        }
      });
    }
  }

  /* -------------------------------------------------------------
     GLOBAL HELPER: NAVIGASI & SHORTCUT KEYBOARD
     ------------------------------------------------------------- */
  switchStage(fromStage, toStage) {
    if (fromStage) {
      fromStage.classList.remove('active');
    }
    if (toStage) {
      toStage.classList.add('active');
    }
  }

  setupGlobalShortcuts() {
    // Tombol Escape menutup panel atau lightbox yang sedang terbuka
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.getElementById('photo-lightbox');
        if (lightbox && !lightbox.classList.contains('hidden')) {
          lightbox.classList.add('hidden');
          return;
        }
        if (this.currentActivePanel) {
          this.closePanel();
        }
      }
    });
  }
}

// Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
window.addEventListener('DOMContentLoaded', () => {
  window.app = new BirthdayApp();
});
