"use client";
import { useState, useEffect, useRef } from "react";

const navItems = {
  en: ["Solutions", "Hardware", "Docs", "Contact"],
  zh: ["解决方案", "硬件", "文档", "联系我们"],
};

const featuresData = {
  en: [
    { title: "Hardware-Agnostic Platform", desc: "Seamlessly integrate with any major chassis — from AMRs to articulated arms. One unified API layer abstracts away hardware complexity so your team ships faster.", tag: "UNIVERSAL" },
    { title: "Cloud-Native Brain", desc: "Built on edge-optimized infrastructure with sub-50ms latency. Our orchestration engine handles fleet scheduling, path planning, and real-time telemetry at scale.", tag: "SCALABLE" },
    { title: "ROS & Isaac Sim Ready", desc: "Native support for ROS 2 Humble and NVIDIA Isaac Sim. Validate algorithms in photorealistic simulation, then deploy to production with a single CLI command.", tag: "DEV-FIRST" },
  ],
  zh: [
    { title: "硬件无关平台", desc: "无缝兼容各类主流底盘设备——从自主移动机器人到多关节机械臂。统一的 API 抽象层屏蔽硬件复杂性，让您的团队更快交付。", tag: "通用" },
    { title: "云原生调度中枢", desc: "基于边缘优化架构，端到端延迟低于 50ms。调度引擎可大规模处理车队编排、路径规划与实时遥测数据。", tag: "可扩展" },
    { title: "ROS & Isaac Sim 就绪", desc: "原生支持 ROS 2 Humble 与 NVIDIA Isaac Sim。在高保真仿真中验证算法，一行命令即可部署至生产环境。", tag: "开发者优先" },
  ],
};

const statsData = {
  en: [
    { value: "none", label: "Uptime SLA" },
    { value: "none", label: "Edge Latency" },
    { value: "none", label: "Fleet Robots" },
    { value: "none", label: "Enterprise Clients" },
  ],
  zh: [
    { value: "正在开发", label: "可用性 SLA" },
    { value: "正在开发", label: "边缘延迟" },
    { value: "正在开发", label: "在役机器人" },
    { value: "正在开发", label: "企业客户" },
  ],
};

const heroSlides = {
  en: [
    { headline: "Solving Robot Deployment", sub: "From lab prototype to warehouse fleet — we handle the hardest part of robotics." },
    { headline: "Four-Arm Mobile Data Acquisition and Manipulation Platforms", sub: "An advanced mobile platform equipped with a multi-degree-of-freedom robotic arm, powered by ROS and a cloud-native architecture." },
    { headline: "Real Engineers, Real Robots", sub: "Our team works with cutting-edge chassis hardware on a daily basis, manually configuring and fine-tuning every single device." },
    { headline: "Humanoid-Ready Infrastructure", sub: "From wheeled AMRs to bipedal humanoids — our platform scales across every form factor." },
  ],
  zh: [
    { headline: "解决机器人部署难题", sub: "从实验室原型到仓储车队——我们攻克机器人落地最难的环节。" },
    { headline: "四臂数据采集移动操作平台", sub: "搭载多自由度机械臂的先进移动平台，由 ROS与云原生架构驱动。" },
    { headline: "真实工程师真实机器人", sub: "我们的团队每天都在与前沿底盘硬件打交道，亲手调试每一台设备。" },
    { headline: "人形机器人就绪基础设施", sub: "从轮式 AMR 到双足人形——我们的平台适配一切形态。" },
  ],
};

const texts = {
  en: {
    beta: "NOW IN PRIVATE BETA",
    cta1: "Get Started", cta2: "View API Docs",
    featLabel: "Core Capabilities", featTitle1: "Everything you need to", featTitle2: "deploy robots at scale",
    ctaTitle: "Ready to automate?", ctaSub: "Join the private beta. Get dedicated onboarding, priority API access, and a direct line to our robotics engineering team.", ctaBtn: "Request Early Access",
    signIn: "Sign In", founder: "Founded by Marvin",
  },
  zh: {
    beta: "私有测试中",
    cta1: "立即开始", cta2: "查看 API 文档",
    featLabel: "核心能力", featTitle1: "规模化部署机器人", featTitle2: "所需的一切",
    ctaTitle: "准备好自动化了吗？", ctaSub: "加入私有测试计划，获得专属引导、优先 API 权限，以及与我们机器人工程团队的直接沟通渠道。", ctaBtn: "申请抢先体验",
    signIn: "登录", founder: "创始人 Marvin",
  },
};

const featureIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

// Uploaded images as data — we reference them via window.fs
const IMAGE_URLS = [
  "image_1", "image_2", "image_3", "image_4"
];

function useImageLoader() {
  const [images, setImages] = useState([null, null, null, null]);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const results = [];
      const files = [
        { name: "Image 1" },
        { name: "Image 2" },
        { name: "Image 3" },
        { name: "Image 4" },
      ];
      for (let i = 0; i < 4; i++) {
        results.push(null);
      }
      if (!cancelled) setImages(results);
    }
    load();
    return () => { cancelled = true; };
  }, []);
  return images;
}

function Particles({ light }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let w = (cv.width = cv.offsetWidth * 2);
    let h = (cv.height = cv.offsetHeight * 2);
    ctx.scale(2, 2);
    const hw = w / 2, hh = h / 2;
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * hw, y: Math.random() * hh,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, hw, hh);
      const dc = light ? "rgba(0,100,160,0.2)" : "rgba(0,234,255,0.3)";
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > hw) p.vx *= -1;
        if (p.y < 0 || p.y > hh) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dc; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            const a = 0.06 * (1 - d / 120);
            ctx.strokeStyle = light ? `rgba(0,100,160,${a})` : `rgba(0,234,255,${a})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [light]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />;
}

// Placeholder colored images to simulate uploaded photos
function PlaceholderImage({ index, style, className }) {
  const scenes = [
    { bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", label: "Team × Hardware", emoji: "🤝" },
    { bg: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%)", label: "Media Coverage", emoji: "📰" },
    { bg: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)", label: "Dual-Arm Platform", emoji: "🦾" },
    { bg: "linear-gradient(135deg, #1c1c2e 0%, #2a1f4e 50%, #1a1a3e 100%)", label: "Humanoid Lab", emoji: "🤖" },
  ];
  const s = scenes[index];
  return (
    <div className={className} style={{ ...style, background: s.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <span style={{ fontSize: 64 }}>{s.emoji}</span>
      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase" }}>{s.label}</span>
      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>Uploaded Image {index + 1}</span>
    </div>
  );
}

export default function StratosLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [slide, setSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const iv = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSlide(s => (s + 1) % 4);
        setFade(true);
      }, 600);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const goSlide = (i) => {
    if (i === slide) return;
    setFade(false);
    setTimeout(() => { setSlide(i); setFade(true); }, 400);
  };

  const t = texts[lang];
  const sl = heroSlides[lang][slide];
  const accent = "#00EAFF";
  const accentDk = "#0088AA";

  const bg = dark ? "linear-gradient(180deg, #000 0%, #070B14 40%, #0A0F1A 100%)" : "linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 40%, #E2E8F0 100%)";
  const textPrimary = dark ? "#FFFFFF" : "#0F172A";
  const textMuted = dark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.55)";
  const textFaint = dark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.4)";
  const textNav = dark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.55)";
  const cardBg = dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)";
  const cardBorder = dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)";
  const navBg = dark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.75)";
  const navBorder = dark ? "rgba(0,234,255,0.08)" : "rgba(15,23,42,0.06)";
  const accentReal = dark ? accent : "#0284C7";
  const gradTitle = dark ? "linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.65) 100%)" : "linear-gradient(180deg, #0F172A 0%, rgba(15,23,42,0.75) 100%)";
  const footerBorder = dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)";

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: bg, color: textPrimary, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", transition: "background 0.5s, color 0.5s" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? navBg : "transparent", backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none", borderBottom: scrolled ? `1px solid ${navBorder}` : "1px solid transparent" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-black" style={{ background: `linear-gradient(135deg, ${accent}, ${accentDk})` }}>S</div>
            <span className="text-lg font-semibold tracking-tight">Stratos</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navItems[lang].map(n => (
              <a key={n} href="#" className="text-sm transition-colors duration-200" style={{ color: textNav }}
                onMouseEnter={e => e.target.style.color = accentReal} onMouseLeave={e => e.target.style.color = textNav}>{n}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-medium px-3 py-1 rounded-full mr-1" style={{ color: textFaint, border: `1px solid ${cardBorder}` }}>{t.founder}</span>
            <button onClick={() => setLang(l => l === "en" ? "zh" : "en")} className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all" style={{ border: `1px solid ${cardBorder}`, color: textNav, background: cardBg }}>{lang === "en" ? "中文" : "EN"}</button>
            <button onClick={() => setDark(d => !d)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ border: `1px solid ${cardBorder}`, background: cardBg, color: textNav }}>
              {dark ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>}
            </button>
            <a href="#" className="text-sm px-4 py-2 rounded-lg" style={{ color: textNav }}>{t.signIn}</a>
            <a href="#" className="text-sm font-medium px-5 py-2 rounded-lg" style={{ background: accentReal, color: dark ? "#000" : "#FFF", boxShadow: `0 0 20px ${accentReal}33` }}>{t.cta1}</a>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setLang(l => l === "en" ? "zh" : "en")} className="text-xs font-medium px-2 py-1 rounded" style={{ border: `1px solid ${cardBorder}`, color: textNav }}>{lang === "en" ? "中文" : "EN"}</button>
            <button onClick={() => setDark(d => !d)} className="w-7 h-7 rounded flex items-center justify-center" style={{ border: `1px solid ${cardBorder}`, color: textNav }}>
              {dark ? <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/></svg> : <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} style={{ color: textPrimary }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">{mobileMenu ? <path d="M6 6l12 12M6 18L18 6"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}</svg>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3" style={{ background: dark ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)" }}>
            <span className="text-xs pt-2" style={{ color: textFaint }}>{t.founder}</span>
            {navItems[lang].map(n => <a key={n} href="#" className="text-sm py-2" style={{ color: textNav }}>{n}</a>)}
            <a href="#" className="text-sm font-medium px-5 py-2.5 rounded-lg text-center" style={{ background: accentReal, color: dark ? "#000" : "#FFF" }}>{t.cta1}</a>
          </div>
        )}
      </nav>

      {/* HERO WITH IMAGE CAROUSEL */}
      <section className="relative min-h-screen flex items-center px-6 pt-20 pb-16">
        {/* Background particles */}
        <Particles light={!dark} />
        <div className="absolute w-96 h-96 -top-20 -left-40 rounded-full blur-3xl pointer-events-none" style={{ background: accentReal, opacity: dark ? 0.12 : 0.06 }} />
        <div className="absolute w-72 h-72 bottom-20 -right-20 rounded-full blur-3xl pointer-events-none" style={{ background: "#6C3AED", opacity: dark ? 0.1 : 0.04 }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 tracking-wide" style={{ border: `1px solid ${accentReal}33`, background: `${accentReal}0A`, color: accentReal }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentReal }} />
              {t.beta}
            </div>

            <div style={{ minHeight: 180 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5"
                style={{ background: gradTitle, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: fade ? 1 : 0, transition: "opacity 0.5s ease", }}>
                {sl.headline}
              </h1>
              <p className="text-lg max-w-lg leading-relaxed mb-8" style={{ color: textMuted, opacity: fade ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}>
                {sl.sub}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <a href="#" className="group px-7 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2" style={{ background: accentReal, color: dark ? "#000" : "#FFF", boxShadow: `0 0 30px ${accentReal}44` }}>
                {t.cta1}
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5"><path d="M3 8h10m-4-4l4 4-4 4"/></svg>
              </a>
              <a href="#" className="px-7 py-3 rounded-xl text-sm font-medium inline-flex items-center gap-2" style={{ border: `1px solid ${cardBorder}`, color: textMuted, background: cardBg }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 3v8l6-4z"/></svg>
                {t.cta2}
              </a>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-2">
              {[0,1,2,3].map(i => (
                <button key={i} onClick={() => goSlide(i)}
                  className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: slide === i ? 32 : 12, background: slide === i ? "transparent" : (dark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.15)") }}
                >
                  {slide === i && (
                    <>
                      <div className="absolute inset-0 rounded-full" style={{ background: dark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.12)" }} />
                      <div className="absolute top-0 left-0 h-full rounded-full" style={{ background: accentReal, animation: "slideProgress 5s linear" }} />
                      <style>{`@keyframes slideProgress { from { width: 0%; } to { width: 100%; } }`}</style>
                    </>
                  )}
                </button>
              ))}
              <span className="text-xs ml-3 font-mono" style={{ color: textFaint }}>0{slide + 1} / 04</span>
            </div>
          </div>

          {/* Right: Image Carousel */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ border: `1px solid ${cardBorder}`, boxShadow: dark ? `0 25px 80px rgba(0,0,0,0.5), 0 0 60px ${accentReal}08` : "0 25px 80px rgba(0,0,0,0.1)" }}>
              {/* Simulated images with gradients */}
             <img 
  src={`/images/slide-${slide + 1}.jpg`} 
  className="absolute inset-0 w-full h-full object-cover" 
  style={{ opacity: fade ? 1 : 0, transition: "opacity 0.6s ease" }} 
  alt="Stratos Robot" 
/>
              {/* Overlay gradient */}
              <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)"} 0%, transparent 40%)` }} />
              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ opacity: fade ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${accentReal}22`, color: accentReal, border: `1px solid ${accentReal}33` }}>
                  {lang === "en" ? "Live from our lab" : "实验室实拍"}
                </span>
              </div>
            </div>
            {/* Decorative border glow */}
            <div className="absolute -inset-px rounded-2xl pointer-events-none" style={{ background: `linear-gradient(135deg, ${accentReal}22, transparent, ${accentReal}11)`, zIndex: -1, filter: "blur(1px)" }} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-5xl mx-auto rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          {statsData[lang].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: accentReal }}>{s.value}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: textFaint }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: accentReal }}>{t.featLabel}</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ background: gradTitle, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.featTitle1}<br/>{t.featTitle2}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuresData[lang].map((f, i) => (
              <div key={i} className="group relative rounded-2xl p-7 transition-all duration-500 cursor-default" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${accentReal}33`; e.currentTarget.style.background = `${accentReal}08`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 60px ${accentReal}11`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.background = cardBg; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${accentReal}15`, color: accentReal }}>{featureIcons[i]}</div>
                <span className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full mb-4 inline-block" style={{ background: `${accentReal}15`, color: accentReal }}>{f.tag}</span>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 text-center relative overflow-hidden" style={{ background: dark ? `linear-gradient(135deg, ${accent}11, rgba(108,58,237,0.07))` : `linear-gradient(135deg, ${accentReal}0D, rgba(108,58,237,0.05))`, border: `1px solid ${accentReal}22` }}>
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ background: accentReal, opacity: dark ? 0.15 : 0.08 }} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t.ctaTitle}</h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: textMuted }}>{t.ctaSub}</p>
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold" style={{ background: accentReal, color: dark ? "#000" : "#FFF", boxShadow: `0 0 40px ${accentReal}44` }}>
            {t.ctaBtn}
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10m-4-4l4 4-4 4"/></svg>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 py-12" style={{ borderTop: `1px solid ${footerBorder}` }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-black" style={{ background: `linear-gradient(135deg, ${accent}, ${accentDk})` }}>S</div>
            <span className="text-sm font-medium" style={{ color: textFaint }}>Stratos RaaS</span>
          </div>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Status"].map(l => <a key={l} href="#" className="text-xs" style={{ color: textFaint }}>{l}</a>)}
          </div>
          <span className="text-xs" style={{ color: textFaint, opacity: 0.6 }}>© 2026 Stratos Technologies, Inc.</span>
        </div>
      </footer>
    </div>
  );
}