import Link from "next/link";
import { Camera, ShieldCheck, Sparkles, Zap, Cloud } from "lucide-react";

const providers = [
  { name: "iCloud Photos",   icon: "☁️", desc: "All your iPhone & Mac memories" },
  { name: "Google Photos",   icon: "📷", desc: "Smart search & face grouping" },
  { name: "Amazon Photos",   icon: "🖼️", desc: "Unlimited Prime photo storage" },
];

const features = [
  { icon: <Sparkles className="w-5 h-5" />, title: "AI Duplicate Detection",  desc: "Perceptual hashing finds near-identical photos across all your services." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Privacy First",        desc: "Tokens stay on your device. We never store your photos — only metadata." },
  { icon: <Zap className="w-5 h-5" />, title: "Instant Gallery",              desc: "Smart caching and lazy loading feel instant with tens of thousands of photos." },
  { icon: <Cloud className="w-5 h-5" />, title: "All Three Clouds",           desc: "The only app that truly unifies iCloud, Google Photos, and Amazon Photos." },
];

const mockPhotos = [
  { h: "h-48", bg: "bg-violet-100" }, { h: "h-64", bg: "bg-rose-100" },
  { h: "h-40", bg: "bg-amber-100" }, { h: "h-56", bg: "bg-sky-100" },
  { h: "h-44", bg: "bg-emerald-100" }, { h: "h-72", bg: "bg-pink-100" },
  { h: "h-48", bg: "bg-indigo-100" }, { h: "h-40", bg: "bg-orange-100" },
  { h: "h-60", bg: "bg-teal-100" }, { h: "h-52", bg: "bg-purple-100" },
  { h: "h-36", bg: "bg-lime-100" }, { h: "h-64", bg: "bg-cyan-100" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: "#222222" }}>
      {/* Apple glass nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass-nav">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">PhotoFuse</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className="text-sm font-medium px-4 py-2 rounded-full transition-colors" style={{ color: "#6a6a6a" }}>Sign in</Link>
            <Link href="/sign-in" className="text-sm font-semibold text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity" style={{ background: "#7c3aed" }}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-8" style={{ background: "#ede9fe", color: "#7c3aed" }}>
            <Sparkles className="w-3 h-3" /> AI-powered duplicate detection
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-5 leading-tight" style={{ letterSpacing: "-0.03em" }}>
            All your photos, <span className="text-brand-gradient">one gallery</span>
          </h1>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "#6a6a6a" }}>
            PhotoFuse connects iCloud, Google Photos, and Amazon Photos into a single, beautiful view — privacy first, no uploads.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link href="/sign-in" className="inline-flex items-center justify-center font-semibold text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity" style={{ background: "#7c3aed", boxShadow: "0 4px 14px rgba(124,58,237,0.35)" }}>
              Start for free
            </Link>
            <a href="#features" className="inline-flex items-center justify-center font-medium px-8 py-3 rounded-full border transition-colors hover:bg-gray-50" style={{ borderColor: "#e5e5e0", color: "#222222" }}>
              See how it works
            </a>
          </div>

          {/* Provider badges */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
            {providers.map((p) => (
              <div key={p.name} className="p-4 rounded-2xl text-center" style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}>
                <div className="text-2xl mb-1.5">{p.icon}</div>
                <div className="text-xs font-semibold">{p.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "#91918c" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pinterest masonry preview */}
      <section className="py-10 px-4" style={{ background: "#f6f6f3" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#91918c" }}>Your photos, unified</p>
          <div className="masonry opacity-75">
            {mockPhotos.map((p, i) => (
              <div key={i} className={`masonry-item ${p.h} ${p.bg} rounded-2xl`} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ letterSpacing: "-0.02em" }}>Built for your photos</h2>
            <p style={{ color: "#6a6a6a" }}>Everything you need, nothing you don&apos;t.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-3xl" style={{ background: "#f6f6f3" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: "#ede9fe", color: "#7c3aed" }}>{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6a6a6a" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#f6f6f3" }}>
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-3" style={{ letterSpacing: "-0.02em" }}>Ready to fuse your photos?</h2>
          <p className="mb-8" style={{ color: "#6a6a6a" }}>Connect in seconds. No credit card required.</p>
          <Link href="/sign-in" className="inline-flex items-center justify-center font-semibold text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity" style={{ background: "#7c3aed" }}>
            Get started free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t" style={{ borderColor: "#e5e5e0" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4" style={{ color: "#91918c" }} />
            <span className="text-sm font-semibold">PhotoFuse</span>
          </div>
          <p className="text-xs" style={{ color: "#91918c" }}>© {new Date().getFullYear()} PhotoFuse · Privacy first, always.</p>
        </div>
      </footer>
    </div>
  );
}
