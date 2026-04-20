import Link from "next/link";
import { Camera, ShieldCheck, Sparkles, Zap, Cloud, ArrowRight } from "lucide-react";

const providers = [
  { name: "iCloud Photos", icon: "☁️", desc: "All your iPhone & Mac memories" },
  { name: "Google Photos", icon: "📷", desc: "Smart search & face grouping" },
  { name: "Amazon Photos", icon: "🖼️", desc: "Unlimited Prime photo storage" },
];

const features = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI Duplicate Detection",
    desc: "Perceptual hashing finds near-identical photos across all your services.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Privacy First",
    desc: "Tokens stay on your device. We never store your photos — only metadata.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Instant Gallery",
    desc: "Smart caching and lazy loading feel instant with tens of thousands of photos.",
  },
  {
    icon: <Cloud className="w-5 h-5" />,
    title: "All Three Clouds",
    desc: "The only app that truly unifies iCloud, Google Photos, and Amazon Photos.",
  },
];

const mockPhotos = [
  { h: "h-48", bg: "#e8e6dc" },
  { h: "h-64", bg: "#f0eee6" },
  { h: "h-40", bg: "#e8e6dc" },
  { h: "h-56", bg: "#f0eee6" },
  { h: "h-44", bg: "#e8e6dc" },
  { h: "h-72", bg: "#f0eee6" },
  { h: "h-48", bg: "#e8e6dc" },
  { h: "h-40", bg: "#f0eee6" },
  { h: "h-60", bg: "#e8e6dc" },
  { h: "h-52", bg: "#f0eee6" },
  { h: "h-36", bg: "#e8e6dc" },
  { h: "h-64", bg: "#f0eee6" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f4ed", color: "#141413" }}>
      {/* Glass nav — parchment-tinted per DESIGN.md */}
      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: "rgba(245, 244, 237, 0.85)",
          backdropFilter: "saturate(180%) blur(12px)",
          WebkitBackdropFilter: "saturate(180%) blur(12px)",
          borderBottom: "1px solid #f0eee6",
          height: "64px",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ background: "#c96442", borderRadius: "12px" }}
            >
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 500,
                fontSize: "18px",
                color: "#141413",
              }}
            >
              PhotoFuse
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="text-sm px-4 py-2 transition-colors"
              style={{
                color: "#5e5d59",
                fontFamily: "system-ui",
                fontWeight: 400,
                fontSize: "15px",
                borderRadius: "8px",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/sign-in"
              className="text-sm font-medium px-5 py-2 transition-colors"
              style={{
                background: "#c96442",
                color: "#faf9f5",
                borderRadius: "10px",
                fontFamily: "system-ui",
                fontWeight: 500,
                fontSize: "15px",
              }}
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — Parchment section */}
      <section style={{ paddingTop: "120px", paddingBottom: "64px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-8"
            style={{
              background: "rgba(201, 100, 66, 0.10)",
              color: "#c96442",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 500,
              fontFamily: "system-ui",
              letterSpacing: "0.12px",
            }}
          >
            <Sparkles className="w-3 h-3" />
            AI-powered duplicate detection
          </div>
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: "#141413",
              marginBottom: "20px",
              letterSpacing: "normal",
            }}
          >
            All your photos,{" "}
            <span style={{ color: "#c96442" }}>one gallery</span>
          </h1>
          <p
            className="max-w-xl mx-auto"
            style={{
              fontSize: "20px",
              color: "#5e5d59",
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 1.6,
              marginBottom: "40px",
            }}
          >
            PhotoFuse connects iCloud, Google Photos, and Amazon Photos into a single, beautiful
            view — privacy first, no uploads.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 font-medium transition-colors"
              style={{
                background: "#c96442",
                color: "#faf9f5",
                padding: "12px 28px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 500,
                fontFamily: "system-ui",
                boxShadow: "0px 0px 0px 1px #c96442",
              }}
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center font-medium transition-colors"
              style={{
                background: "transparent",
                color: "#4d4c48",
                padding: "12px 28px",
                borderRadius: "8px",
                border: "1px solid #e8e6dc",
                fontSize: "15px",
                fontWeight: 500,
                fontFamily: "system-ui",
              }}
            >
              See how it works
            </a>
          </div>

          {/* Provider badges */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
            {providers.map((p) => (
              <div
                key={p.name}
                className="p-4 text-center"
                style={{
                  background: "#faf9f5",
                  border: "1px solid #f0eee6",
                  borderRadius: "16px",
                  boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08)",
                }}
              >
                <div className="text-2xl mb-1.5">{p.icon}</div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#141413",
                    fontFamily: "system-ui",
                  }}
                >
                  {p.name}
                </div>
                <div
                  className="mt-0.5"
                  style={{ fontSize: "11px", color: "#87867f", fontFamily: "system-ui" }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry preview — Near Black section for magazine pacing */}
      <section
        className="py-16 px-4"
        style={{ background: "#141413" }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-center mb-8"
            style={{
              fontSize: "10px",
              fontWeight: 500,
              textTransform: "uppercase" as const,
              letterSpacing: "0.5px",
              color: "#87867f",
              fontFamily: "system-ui",
              lineHeight: 1.6,
            }}
          >
            Your photos, unified
          </p>
          <div className="masonry opacity-60">
            {mockPhotos.map((p, i) => (
              <div
                key={i}
                className={`masonry-item ${p.h}`}
                style={{
                  background: p.bg,
                  borderRadius: "12px",
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features — Parchment section */}
      <section
        id="features"
        style={{
          padding: "80px 24px",
          background: "#f5f4ed",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "36px",
                fontWeight: 500,
                color: "#141413",
                lineHeight: 1.25,
                marginBottom: "8px",
              }}
            >
              Built for your photos
            </h2>
            <p style={{ color: "#5e5d59", fontFamily: "system-ui", fontSize: "16px" }}>
              Everything you need, nothing you don&apos;t.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6"
                style={{
                  background: "#faf9f5",
                  border: "1px solid #f0eee6",
                  borderRadius: "16px",
                }}
              >
                <div
                  className="w-9 h-9 flex items-center justify-center mb-3"
                  style={{
                    background: "rgba(201, 100, 66, 0.10)",
                    color: "#c96442",
                    borderRadius: "10px",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  className="mb-1"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#141413",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5e5d59", fontFamily: "system-ui" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Near Black section */}
      <section
        style={{
          padding: "80px 24px",
          background: "#141413",
        }}
      >
        <div className="max-w-md mx-auto text-center">
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "36px",
              fontWeight: 500,
              color: "#faf9f5",
              lineHeight: 1.25,
              marginBottom: "12px",
            }}
          >
            Ready to fuse your photos?
          </h2>
          <p
            className="mb-8"
            style={{ color: "#b0aea5", fontFamily: "system-ui", fontSize: "16px" }}
          >
            Connect in seconds. No credit card required.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center gap-2 font-medium transition-colors"
            style={{
              background: "#c96442",
              color: "#faf9f5",
              padding: "12px 28px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 500,
              fontFamily: "system-ui",
            }}
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6"
        style={{ borderTop: "1px solid #f0eee6", background: "#f5f4ed" }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4" style={{ color: "#87867f" }} />
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#141413",
              }}
            >
              PhotoFuse
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="transition-colors"
              style={{ fontSize: "12px", color: "#87867f", fontFamily: "system-ui" }}
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="transition-colors"
              style={{ fontSize: "12px", color: "#87867f", fontFamily: "system-ui" }}
            >
              Privacy
            </Link>
            <p style={{ fontSize: "12px", color: "#87867f", fontFamily: "system-ui" }}>
              © {new Date().getFullYear()} PhotoFuse
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
