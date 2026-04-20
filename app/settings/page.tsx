import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { Moon, Bell, Shield, HardDrive } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) redirect("/sign-in");

  const settingsSections = [
    {
      icon: <Moon className="w-4 h-4" />,
      title: "Appearance",
      description: "Choose your preferred theme for viewing photos.",
      options: [
        { label: "Light (Parchment)", value: "light", active: true },
        { label: "Dark", value: "dark", active: false },
        { label: "System", value: "system", active: false },
      ],
    },
    {
      icon: <Bell className="w-4 h-4" />,
      title: "Notifications",
      description: "Get notified when syncs complete or new photos are detected.",
      toggle: true,
      toggleLabel: "Email notifications",
      toggleActive: false,
    },
    {
      icon: <HardDrive className="w-4 h-4" />,
      title: "Sync Preferences",
      description: "Control how often PhotoFuse syncs with your providers.",
      options: [
        { label: "Manual only", value: "manual", active: true },
        { label: "Every hour", value: "hourly", active: false },
        { label: "Daily", value: "daily", active: false },
      ],
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: "Privacy",
      description: "Manage how your data is handled.",
      toggle: true,
      toggleLabel: "Show duplicate detection badges",
      toggleActive: true,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f5f4ed" }}>
      <Navbar user={session.user} />
      <main className="max-w-2xl mx-auto px-4 sm:px-6" style={{ paddingTop: "64px", paddingBottom: "80px" }}>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "36px",
            fontWeight: 500,
            color: "#141413",
            lineHeight: 1.25,
            marginBottom: "32px",
          }}
        >
          Settings
        </h1>

        <div className="space-y-4">
          {settingsSections.map((section) => (
            <div
              key={section.title}
              className="p-7"
              style={{
                background: "#faf9f5",
                border: "1px solid #f0eee6",
                borderRadius: "16px",
                boxShadow: "rgba(0,0,0,0.05) 0px 4px 24px",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(201, 100, 66, 0.10)",
                    color: "#c96442",
                    borderRadius: "8px",
                  }}
                >
                  {section.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#141413",
                  }}
                >
                  {section.title}
                </h3>
              </div>
              <p
                className="mb-4 ml-11"
                style={{
                  fontSize: "14px",
                  color: "#5e5d59",
                  fontFamily: "system-ui",
                  lineHeight: 1.6,
                }}
              >
                {section.description}
              </p>

              {/* Option pills */}
              {section.options && (
                <div className="flex gap-2 ml-11 flex-wrap">
                  {section.options.map((opt) => (
                    <button
                      key={opt.value}
                      className="px-4 py-2 text-sm transition-all"
                      style={{
                        background: opt.active ? "#141413" : "#e8e6dc",
                        color: opt.active ? "#faf9f5" : "#4d4c48",
                        borderRadius: "8px",
                        fontWeight: 500,
                        fontFamily: "system-ui",
                        boxShadow: opt.active ? "none" : "0px 0px 0px 1px #d1cfc5",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Toggle */}
              {section.toggle && (
                <div className="flex items-center justify-between ml-11">
                  <span style={{ fontSize: "14px", color: "#4d4c48", fontFamily: "system-ui" }}>
                    {section.toggleLabel}
                  </span>
                  <button
                    className="relative w-11 h-6 rounded-full transition-colors"
                    style={{
                      background: section.toggleActive ? "#c96442" : "#e8e6dc",
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform"
                      style={{
                        left: section.toggleActive ? "22px" : "2px",
                      }}
                    />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div
          className="mt-6 p-7"
          style={{
            background: "rgba(181, 51, 51, 0.04)",
            border: "1px solid rgba(181, 51, 51, 0.15)",
            borderRadius: "16px",
          }}
        >
          <h3
            className="mb-2"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "18px",
              fontWeight: 500,
              color: "#b53333",
            }}
          >
            Danger zone
          </h3>
          <p
            className="mb-4"
            style={{ fontSize: "14px", color: "#5e5d59", fontFamily: "system-ui", lineHeight: 1.6 }}
          >
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              background: "rgba(181,51,51,0.10)",
              color: "#b53333",
              border: "1px solid rgba(181,51,51,0.25)",
              borderRadius: "8px",
              fontFamily: "system-ui",
            }}
          >
            Delete account
          </button>
        </div>
      </main>
    </div>
  );
}
