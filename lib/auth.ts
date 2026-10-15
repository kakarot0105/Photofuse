import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || "",
  ].filter(Boolean),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scopes: [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/photoslibrary.readonly",
      ],
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      teamId: process.env.APPLE_TEAM_ID!,
      keyId: process.env.APPLE_KEY_ID!,
      privateKey: process.env.APPLE_PRIVATE_KEY!,
    },
  },
  // Amazon is not a built-in better-auth social provider — wire via genericOAuth
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "amazon",
          clientId: process.env.AMAZON_CLIENT_ID!,
          clientSecret: process.env.AMAZON_CLIENT_SECRET!,
          authorizationUrl: "https://www.amazon.com/ap/oa",
          tokenUrl: "https://api.amazon.com/auth/o2/token",
          userInfoUrl: "https://api.amazon.com/user/profile",
          scopes: ["profile"],
          // Login with Amazon + client secret does not require PKCE
          pkce: false,
          getUserInfo: async (tokens) => {
            if (!tokens.accessToken) return null;
            const res = await fetch("https://api.amazon.com/user/profile", {
              headers: { Authorization: `Bearer ${tokens.accessToken}` },
            });
            if (!res.ok) return null;
            const profile = (await res.json()) as {
              user_id?: string;
              name?: string;
              email?: string;
            };
            if (!profile.user_id) return null;
            return {
              id: profile.user_id,
              name: profile.name,
              email: profile.email,
              emailVerified: Boolean(profile.email),
              image: undefined,
            };
          },
        },
      ],
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
