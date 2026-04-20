import Link from "next/link";
import { Camera } from "lucide-react";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: "14px", color: "#87867f", marginBottom: "32px", fontFamily: "system-ui" }}>
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div style={{ color: "#5e5d59", fontFamily: "system-ui", fontSize: "16px", lineHeight: 1.6 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            Your Privacy Matters
          </h2>
          <p>
            PhotoFuse is built with privacy as a core principle. We believe your photos are deeply personal,
            and we&apos;ve designed our service to never compromise on your privacy.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            What We Access
          </h2>
          <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Photo metadata only:</strong> File names, dimensions, timestamps, and thumbnail URLs.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Read-only access:</strong> We never modify, delete, or upload photos to your accounts.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>OAuth tokens:</strong> Stored securely to maintain your connection to each provider.
            </li>
          </ul>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            What We Never Do
          </h2>
          <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
            <li style={{ marginBottom: "8px" }}>We never copy or store your actual photos</li>
            <li style={{ marginBottom: "8px" }}>We never share your data with third parties</li>
            <li style={{ marginBottom: "8px" }}>We never use your photos for training AI models</li>
            <li style={{ marginBottom: "8px" }}>We never sell your personal information</li>
          </ul>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            Data Storage
          </h2>
          <p>
            We store the minimum metadata necessary to display your unified gallery: photo identifiers,
            filenames, dimensions, timestamps, and thumbnail URLs. All data is encrypted at rest
            and in transit.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            Disconnecting & Deletion
          </h2>
          <p>
            You can disconnect any provider at any time from the Connect page. When you disconnect,
            all associated metadata is immediately deleted from our database. You can also request
            complete account deletion by contacting us.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#141413", margin: "32px 0 12px" }}>
            Contact
          </h2>
          <p>
            For privacy concerns, please contact us at privacy@photofuse.app.
          </p>
        </div>
      </main>
    </div>
  );
}
