import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  LineChart,
  Trophy,
  Target,
  ListOrdered,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const FEATURES = [
  { icon: MapPin, title: "GPS Tracking", desc: "Real-time route capture using your device's GPS." },
  { icon: LineChart, title: "Running Analytics", desc: "Pace, speed, and distance trends over time." },
  { icon: Trophy, title: "Personal Records", desc: "Automatically calculated from your best efforts." },
  { icon: Target, title: "Goals", desc: "Set distance, frequency, or pace targets and track progress." },
  { icon: ListOrdered, title: "Activity History", desc: "Every run, saved and searchable." },
];

// This week's distances (km), Mon–Sun. Today is Friday: the rest of the
// week is still a plan, not a result, so those bars render as a target.
const WEEK = [
  { day: "M", km: 5.2, done: true },
  { day: "T", km: 0, done: true },
  { day: "W", km: 8.1, done: true },
  { day: "T", km: 6.4, done: true },
  { day: "F", km: 4.6, done: true },
  { day: "S", km: 10, done: false },
  { day: "S", km: 0, done: false },
];

function Reveal({ children, delay = 0, className = "", direction = "up" }) {
  const cls = {
    up: "animate-fade-up",
    down: "animate-fade-down",
    scale: "animate-fade-scale",
  }[direction];

  return (
    <div className={`opacity-0 ${cls} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Logomark({ className = "" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M4 26 L11 12 L16 20 L21 8 L28 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="26" r="2.4" fill="currentColor" />
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="w-full max-w-6xl mx-auto px-5 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between relative z-50">
        <Reveal delay={0} direction="down">
          <div className="flex items-center gap-2 text-white">
            <Logomark className="w-6 h-6 sm:w-7 sm:h-7 text-[#3FA391]" />
            <span className="text-[19px] sm:text-[21px] font-semibold tracking-tight">RUNTRACK</span>
          </div>
        </Reveal>

        <Reveal delay={100} direction="down" className="hidden md:block">
          <a
            href="#features"
            className="h-[46px] px-6 flex items-center bg-white/[0.06] rounded-full backdrop-blur-md border border-white/10 text-white/75 text-[14px] font-medium hover:text-white hover:border-white/20 transition-colors focus-visible:outline-white"
          >
            Features
          </a>
        </Reveal>

        <Reveal delay={180} direction="down" className="hidden md:flex">
          <div className="h-[46px] p-[3px] bg-white/[0.06] rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1">
            <Link
              to="/login"
              className="h-[40px] px-5 rounded-full flex items-center text-white text-[14px] font-medium hover:bg-white/10 transition-colors focus-visible:outline-white"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="h-[40px] px-5 rounded-full flex items-center bg-[#EDEDEA] text-[#0B120F] text-[14px] font-semibold hover:bg-white transition-colors focus-visible:outline-white"
            >
              Start running
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100} direction="down" className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-white focus-visible:outline-white"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </Reveal>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="absolute inset-0 bg-[#070B0A]/90 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-[84px] left-4 right-4 bg-white/[0.06] backdrop-blur-2xl rounded-2xl border border-white/10 p-5 transition-all duration-300 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <a
            href="#features"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-4 py-3.5 rounded-xl text-white/90 text-[16px] font-medium hover:bg-white/[0.06]"
          >
            Features <ChevronRight className="w-4 h-4 opacity-50" />
          </a>
          <div className="h-px bg-white/10 my-4" />
          <div className="flex flex-col gap-2.5">
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="w-full h-[48px] rounded-xl bg-[#EDEDEA] text-[#0B120F] text-[15px] font-semibold flex items-center justify-center"
            >
              Start running
            </Link>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="w-full h-[48px] rounded-xl border border-white/20 text-white text-[15px] font-medium flex items-center justify-center"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function WeeklyCard() {
  const max = Math.max(...WEEK.map((d) => d.km), 1);
  const completed = WEEK.filter((d) => d.done).reduce((s, d) => s + d.km, 0);
  const lastWeek = 21.6;
  const growth = (((completed - lastWeek) / lastWeek) * 100).toFixed(1);

  return (
    <Reveal delay={900} direction="scale" className="w-full max-w-[380px] mx-auto lg:mx-0">
      <div className="w-full rounded-[26px] bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-6 sm:p-7">
        <p className="text-white/70 text-[14px] font-medium mb-3">This week</p>

        <p className="mb-2 flex items-baseline gap-1.5">
          <span className="text-white text-[42px] sm:text-[48px] font-semibold leading-none tracking-tight">
            {completed.toFixed(1)}
          </span>
          <span className="text-white/50 text-[18px] font-medium">km</span>
        </p>

        <div className="flex items-center gap-2 mb-7">
          <span className="px-2 py-1 bg-[#3FA391]/20 text-[#7FD9C4] rounded-md text-[12px] font-semibold">
            +{growth}%
          </span>
          <span className="text-white/50 text-[12px]">vs. last week ({lastWeek} km)</span>
        </div>

        <div className="flex items-end gap-2.5 h-[86px]">
          {WEEK.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full rounded-[3px] animate-bar-grow origin-bottom"
                style={{
                  height: `${Math.max((d.km / max) * 100, 4)}%`,
                  backgroundColor: d.done ? "#3FA391" : "rgba(255,255,255,0.14)",
                  animationDelay: `${1100 + i * 60}ms`,
                }}
              />
              <span
                className="text-[10px] font-medium text-white/50"
                style={{ opacity: d.done ? 1 : 0.45 }}
              >
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function RouteBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -left-24 w-[560px] h-[560px] rounded-full bg-[#1F5C56] opacity-30 blur-[110px] animate-drift" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[520px] h-[520px] rounded-full bg-[#3FA391] opacity-[0.18] blur-[120px] animate-drift-slow" />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.35]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -20 620 C 160 560, 220 700, 380 640 C 540 580, 560 420, 720 380 C 880 340, 900 180, 1080 140 C 1160 122, 1190 100, 1220 60"
          stroke="#7FD9C4"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          className="animate-draw-route"
        />
      </svg>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg">
      <section className="relative w-full min-h-screen overflow-hidden bg-[#070B0A]">
        <RouteBackdrop />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Nav />

          <div className="flex-1 flex items-center py-12 sm:py-16">
            <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="max-w-[560px]">
                <Reveal delay={300} direction="up">
                  <h1 className="text-white text-[44px] sm:text-[64px] md:text-[76px] font-semibold leading-[0.95] tracking-tight mb-6">
                    RUN.<br />TRACK.<br />IMPROVE.
                  </h1>
                </Reveal>

                <Reveal delay={480} direction="up">
                  <p className="text-white/60 text-[16px] sm:text-[18px] leading-relaxed max-w-[380px] mb-9">
                    Track every kilometer and understand your running progress.
                  </p>
                </Reveal>

                <Reveal delay={640} direction="up">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/register"
                      className="h-[50px] px-7 flex items-center bg-[#EDEDEA] rounded-full text-[#0B120F] text-[15px] font-semibold hover:bg-white transition-colors focus-visible:outline-white"
                    >
                      Start running
                    </Link>
                    <Link
                      to="/login"
                      className="h-[50px] px-7 flex items-center rounded-full border border-white/25 text-white text-[15px] font-medium hover:border-white/50 transition-colors focus-visible:outline-white"
                    >
                      Log in
                    </Link>
                  </div>
                </Reveal>
              </div>

              <WeeklyCard />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-bg">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink max-w-md mb-12">
            Built for every kind of run
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="border border-border rounded-2xl p-6 bg-white transition-colors hover:border-accent/40"
              >
                <Icon size={22} className="text-accent mb-4" strokeWidth={1.8} />
                <p className="text-sm font-semibold mb-1">{title}</p>
                <p className="text-sm text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
