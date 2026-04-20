import Link from "next/link";
import { Camera } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f4ed" }}>
      {/* Simple nav */}
      <nav
        className="sticky top-0 z-40"
        style={{
          background: "rgba(245, 244, 237, 0.85)",
          backdropFilter: "saturate(180%) blur(12px)",
          WebkitBackdropFilter: "saturate(180%) blur(12px)",
          borderBottom: "1px solid #f0eee6",
          height: "64px",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
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
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6" style={{ paddingTop: "64px", paddingBottom: "80px" }}>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "36px",
            fontWeight: 500,
            color: "#141413",
            lineHeight: 1.25,
            marginBottom: "16px",
          }}
        >
          Terms of Service
        </h1>
        <p style={{ fontSize: "14px", color: "#87867f", marginBottom: "32px", fontFamily: "system-ui" }}>
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div style={{ color: "#5e5d59", fontFamily: "system-ui", fontSize: "16px", lineHeight: 1.6 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using PhotoFuse, you accept and agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our service.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            2. Description of Service
          </h2>
          <p>
            PhotoFuse is a photo aggregation service that connects to your existing photo providers
            (iCloud, Google Photos, Amazon Photos) to display your photos in a unified gallery.
            We do not store your photos — only metadata necessary to display your gallery.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            3. Privacy & Data
          </h2>
          <p>
            PhotoFuse requests read-only access to your photo libraries. We never upload, copy, or
            redistribute your photos. Authentication tokens are stored securely and used solely to
            display your photos within the PhotoFuse interface.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            4. User Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the security of your account and for any activity
            that occurs under your account. You agree not to abuse or misuse the service.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            5. Limitation of Liability
          </h2>
          <p>
            PhotoFuse is provided &quot;as is&quot; without warranties of any kind. We are not liable for any
            damages arising from the use of our service, including but not limited to data loss,
            service interruption, or unauthorized access to your accounts.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            6. Contact
          </h2>
          <p>
            For questions about these terms, please contact us at support@photofuse.app.
          </p>
        </div>
      </main>
    </div>
  );
}
