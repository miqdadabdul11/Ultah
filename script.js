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
      this.ctx.resume().catch(() => { });
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
    } catch (e) { }
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
    } catch (e) { }
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
    } catch (e) { }
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
    } catch (e) { }
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
        } catch (e) { }
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
    } catch (e) { }
  }

  // Suara hati / love pop
  playHeartPop() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } catch (e) {}
  }

  // Suara aamiin doa yang syahdu (arpeggio lembut)
  playAmenChime() {
    if (this.isMuted || !this.ctx) return;
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          if (!this.ctx) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.65);
        } catch (e) {}
      }, idx * 80);
    });
  }

  // Suara terbangkan lentera harapan ke langit
  playLanternChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 1.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.35);
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
   APLIKASI UTAMA (STORY JOURNEY BERTAPAHAP: BAB DEMI BAB)
   =================================================================== */
class BirthdayApp {
  constructor() {
    this.ambient = null;
    this.fx = null;
    this.music = null;

    // Alur Cerita Bertahap (Sequential Story Stages)
    this.storyStages = [
      { id: 'stage-envelope', badge: '', progress: 0 },
      { id: 'stage-letter', badge: '', progress: 0 },
      { id: 'stage-milestone', badge: 'Bab 1/5: Usia Emas ✨', progress: 20 },
      { id: 'stage-memories', badge: 'Bab 2/5: Kenangan Indah 📸', progress: 40 },
      { id: 'stage-prayers', badge: 'Bab 3/5: Untaian Doa 🤲', progress: 60 },
      { id: 'stage-cake', badge: 'Bab 4/5: Tiup Lilin 🎂', progress: 80 },
      { id: 'stage-gift', badge: 'Bab 5/5: Kado Spesial 🎁', progress: 100 }
    ];
    this.currentStageId = 'stage-envelope';

    this.isTyping = false;
    this.typewriterTimeouts = [];

    // DOM Elements Cache
    this.stageEnvelope = document.getElementById('stage-envelope');
    this.stageLetter = document.getElementById('stage-letter');
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

    // 4. Hitung Hari & Jam Otomatis
    this.calculateLifeStats();

    // 5. Setup Semua Langkah Interaktif
    this.setupEnvelopeStage();
    this.setupLetterStage();
    this.setupStageNavigation();
    this.setupMilestoneStage();
    this.setupPanelMemories();
    this.setupPanelPrayers();
    this.setupPanelCake();
    this.setupPanelGift();
    this.setupGlobalShortcuts();
  }

  /* -------------------------------------------------------------
     NAVIGASI UTAMA ANTAR-LANGKAH (STAGE SWITCHER)
     ------------------------------------------------------------- */
  goToStage(targetStageId) {
    sounds.playClick();
    const currentElem = document.getElementById(this.currentStageId);
    const targetElem = document.getElementById(targetStageId);

    if (!targetElem) return;

    if (currentElem) {
      currentElem.classList.remove('active');
    }
    targetElem.classList.add('active');
    this.currentStageId = targetStageId;
    targetElem.scrollTop = 0;

    // Update Step Progress Bar & Badge
    const stageInfo = this.storyStages.find(s => s.id === targetStageId);
    const progressWrapper = document.getElementById('story-progress-wrapper');
    const badgeElem = document.getElementById('story-step-badge');
    const fillElem = document.getElementById('story-progress-fill');

    if (stageInfo && stageInfo.badge) {
      if (progressWrapper) progressWrapper.classList.remove('hidden');
      if (badgeElem) badgeElem.textContent = stageInfo.badge;
      if (fillElem) fillElem.style.width = `${stageInfo.progress}%`;
    } else {
      if (progressWrapper) progressWrapper.classList.add('hidden');
    }

    // Efek Kejutan Masuk Tahap
    if (targetStageId === 'stage-milestone') {
      this.startCountUp();
      if (this.fx) this.fx.burstConfetti(40);
    } else if (targetStageId === 'stage-memories') {
      if (this.fx) this.fx.burstConfetti(30);
    } else if (targetStageId === 'stage-prayers') {
      if (this.fx) this.fx.burstFirework(window.innerWidth * 0.5, window.innerHeight * 0.3, ['#ffd778', '#f6ecd6', '#ffffff']);
    } else if (targetStageId === 'stage-gift') {
      if (this.fx) {
        this.fx.burstFirework(window.innerWidth * 0.5, window.innerHeight * 0.3, ['#ffd778', '#ff4d4d', '#ffffff']);
      }
    }
  }

  setupStageNavigation() {
    document.querySelectorAll('.stage-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = btn.getAttribute('data-target');
        if (target) {
          this.goToStage(target);
        }
      });
    });
  }

  showToast(text) {
    const toast = document.getElementById('global-toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  /* -------------------------------------------------------------
     LANGKAH 1: AMPLOP PEMBUKA & SEGEL LILIN
     ------------------------------------------------------------- */
  setupEnvelopeStage() {
    const openEnvelope = () => {
      if (this.envelope.classList.contains('is-opening')) return;
      sounds.init();
      sounds.playSealCrack();
      this.music.start();

      this.envelope.classList.add('is-opening');

      // Tembakkan kembang api pembuka & petasan
      setTimeout(() => {
        sounds.playFirecrackerBurst(7);
        if (this.fx) {
          this.fx.launchFireworksSequence(3200, 7);
          this.fx.burstConfetti(80);
        }
      }, 350);

      // Transisi otomatis ke LANGKAH 2: Surat Mengetik
      setTimeout(() => {
        this.goToStage('stage-letter');
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
     LANGKAH 2: SURAT VINTAGE DENGAN EFEK MENGETIK
     ------------------------------------------------------------- */
  setupLetterStage() {
    this.skipTypingBtn.addEventListener('click', () => {
      sounds.playClick();
      this.skipTypewriter();
    });

    this.letterNextBtn.addEventListener('click', () => {
      sounds.playClick();
      this.goToStage('stage-milestone');
    });
  }

  startTypewriterLetter() {
    this.isTyping = true;
    this.typewriterTimeouts = [];

    const feather = document.getElementById('feather-cursor');
    if (feather) feather.classList.remove('hidden');

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
    const feather = document.getElementById('feather-cursor');
    if (feather) feather.classList.add('hidden');
    this.skipTypingBtn.classList.add('hidden');
    this.letterNextBtn.classList.remove('hidden');
  }

  /* -------------------------------------------------------------
     LANGKAH 3: RUANG USIA EMAS & PENGHORMATAN ABI
     ------------------------------------------------------------- */
  calculateLifeStats() {
    const birth = new Date(CONFIG.BIRTH_DATE);
    const now = new Date();
    const diffTime = Math.abs(now - birth);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const formattedDays = diffDays.toLocaleString('id-ID');
    if (this.totalDaysCount) {
      this.totalDaysCount.textContent = formattedDays;
    }

    const hoursEl = document.getElementById('total-hours-count');
    if (hoursEl) {
      const approxHours = (diffDays * 24).toLocaleString('id-ID');
      hoursEl.textContent = `±${approxHours} jam teladan & cinta`;
    }
  }

  startCountUp() {
    const targetAge = CONFIG.TARGET_AGE;
    const duration = 1800;
    const start = performance.now();

    const frame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
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

  setupMilestoneStage() {
    // Wish Capsules Interaktif di Ruang Usia Emas
    const wishButtons = document.querySelectorAll('.wish-capsule-btn');
    wishButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playHeartPop();
        const msg = btn.getAttribute('data-msg');
        this.showToast(msg);
        if (this.fx) {
          const rect = btn.getBoundingClientRect();
          this.fx.burstFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#ffd778', '#ffffff', '#e098a0']);
        }
      });
    });

    // 3D Parallax Tilt halus pada kartu usia
    const ageCard = document.getElementById('hero-age-card');
    if (ageCard) {
      ageCard.addEventListener('pointermove', (e) => {
        const rect = ageCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        ageCard.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
      });
      ageCard.addEventListener('pointerleave', () => {
        ageCard.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
      });
    }
  }

  /* -------------------------------------------------------------
     LANGKAH 4: GALERI KENANGAN INDAH (POLAROID & FAIRY LIGHTS)
     ------------------------------------------------------------- */
  setupPanelMemories() {
    const carousel = document.getElementById('polaroid-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prev-photo-btn');
    const nextBtn = document.getElementById('next-photo-btn');

    if (!carousel) return;

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

      const imgWrap = document.createElement('div');
      imgWrap.className = 'polaroid-img-wrapper';

      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.cap;
      img.loading = 'lazy';

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

      // Tombol Reaksi Cinta ❤️
      const loveBtn = document.createElement('button');
      loveBtn.className = 'polaroid-love-btn';
      loveBtn.setAttribute('aria-label', `Kirim cinta untuk kenangan ini`);
      loveBtn.innerHTML = `❤️ <span class="love-num">0</span>`;
      let loveCount = 0;
      loveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playHeartPop();
        loveCount++;
        loveBtn.querySelector('.love-num').textContent = loveCount;
        loveBtn.style.transform = 'scale(1.28)';
        setTimeout(() => loveBtn.style.transform = '', 200);
        this.showToast(`Cinta untuk foto "${photo.cap}" terkirim! ❤️`);
        if (this.fx) {
          const rect = loveBtn.getBoundingClientRect();
          this.fx.burstFirework(rect.left + rect.width / 2, rect.top, ['#ff4d4d', '#ffd778', '#ffffff']);
        }
      });
      card.appendChild(loveBtn);

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

    // Tombol Navigasi Next / Prev Carousel
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

    // Filter Foto (Asli / Hangat / Vintage)
    const filterPills = document.querySelectorAll('#photo-filters .filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        sounds.playClick();
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-filter');
        carousel.classList.remove('filter-warm', 'filter-vintage');
        if (filter === 'warm') carousel.classList.add('filter-warm');
        if (filter === 'vintage') carousel.classList.add('filter-vintage');
      });
    });

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
     LANGKAH 5: TAMAN UNTAIAN DOA (6 KARTU 3D FLIP & AAMIIN)
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
            <button class="amen-prayer-btn" aria-label="Aamiin-kan doa ${doa.title}">🤲 Aamiin-kan (<span class="amen-num">0</span>)</button>
          </div>
        </div>
      `;

      // Event Tombol Aamiin-kan
      const amenBtn = card.querySelector('.amen-prayer-btn');
      let amenCount = 0;
      amenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playAmenChime();
        amenCount++;
        amenBtn.querySelector('.amen-num').textContent = amenCount;
        this.showToast(`Aamiin ya Rabbal 'Alamin 🤲 (+${amenCount})`);
        if (this.fx) {
          const rect = amenBtn.getBoundingClientRect();
          this.fx.burstFirework(rect.left + rect.width / 2, rect.top, ['#ffd778', '#f6ecd6', '#ffffff']);
        }
      });

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
     LANGKAH 6: PESTA KUE ULANG TAHUN & TIUP LILIN
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

    // 3. Terbangkan Lentera Harapan ke Langit
    const releaseLanternBtn = document.getElementById('release-lantern-btn');
    if (releaseLanternBtn) {
      releaseLanternBtn.addEventListener('click', () => {
        sounds.playLanternChime();
        this.launchSkyLantern();
        this.showToast("Lentera doa & harapan melayang tinggi ke angkasa... 🏮✨");
        if (this.fx) {
          this.fx.burstConfetti(60);
        }
      });
    }

    // 4. Nyalakan Lilin Lagi
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

  launchSkyLantern() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const lantern = document.createElement('div');
        lantern.className = 'sky-lantern-floating';
        lantern.style.left = `${Math.random() * 65 + 18}%`;
        lantern.style.animationDuration = `${Math.random() * 2 + 6}s`;
        document.body.appendChild(lantern);
        setTimeout(() => lantern.remove(), 7500);
      }, i * 450);
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
        audioContext.close().catch(() => { });
      }
    };

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

            let sum = 0;
            for (let i = 0; i < 20; i++) {
              sum += dataArray[i];
            }
            const average = sum / 20;

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
     LANGKAH 7: PUNCAK KADO SPESIAL & PESAN CINTA
     ------------------------------------------------------------- */
  setupPanelGift() {
    const giftBox = document.getElementById('gift-interactive-box');
    const secretMsg = document.getElementById('gift-secret-message');
    const hint = document.getElementById('gift-tap-hint');
    const restartBtn = document.getElementById('restart-flow-btn');
    const openLetterModalBtn = document.getElementById('open-letter-modal-btn');
    const closeLetterModalBtn = document.getElementById('close-letter-modal-btn');
    const letterModal = document.getElementById('letter-modal');

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

    // Modal Baca Surat Lengkap Kembali
    if (openLetterModalBtn && letterModal) {
      openLetterModalBtn.addEventListener('click', () => {
        sounds.playClick();
        letterModal.classList.remove('hidden');
      });
    }
    if (closeLetterModalBtn && letterModal) {
      closeLetterModalBtn.addEventListener('click', () => {
        sounds.playClick();
        letterModal.classList.add('hidden');
      });
    }
    if (letterModal) {
      letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
          sounds.playClick();
          letterModal.classList.add('hidden');
        }
      });
    }

    // Tombol Bagikan ke WhatsApp
    const shareWaBtn = document.getElementById('share-wa-btn');
    if (shareWaBtn) {
      shareWaBtn.addEventListener('click', () => {
        sounds.playCelebrationChime();
        const pageUrl = window.location.href;
        const text = `Selamat Ulang Tahun ke-57 untuk Abi tercinta! ❤️ Semoga panjang umur, selalu sehat dan dalam lindungan Allah. Buka kartu ucapan spesial untuk Abi: ${pageUrl}`;
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
      });
    }

    // Ulangi Perjalanan dari Awal
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        sounds.playClick();
        if (confirm("Ulangi perjalanan perayaan hari bahagia Abi dari awal?")) {
          window.location.reload();
        }
      });
    }
  }

  /* -------------------------------------------------------------
     GLOBAL SHORTCUT KEYBOARD & MODAL CLOSER
     ------------------------------------------------------------- */
  setupGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.getElementById('photo-lightbox');
        if (lightbox && !lightbox.classList.contains('hidden')) {
          lightbox.classList.add('hidden');
          return;
        }
        const letterModal = document.getElementById('letter-modal');
        if (letterModal && !letterModal.classList.contains('hidden')) {
          letterModal.classList.add('hidden');
        }
      }
    });
  }
}

// Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
window.addEventListener('DOMContentLoaded', () => {
  window.app = new BirthdayApp();
});
