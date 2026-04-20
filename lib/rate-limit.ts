/**
 * Rate Limiter — Task #17
 * Simple in-memory rate limiting per user per route.
 * Tracks request timestamps in a Map and rejects requests that exceed the limit.
 *
 * Note: In production, use Redis-based rate limiting for multi-instance deployments.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of Array.from(store.entries())) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

/**
 * Check rate limit for a given user + route combination.
 * @param userId - The user's ID
 * @param route - The API route path (e.g., "/api/photos/google")
 * @param maxRequests - Maximum requests allowed in the window (default: 10)
 * @param windowMs - Time window in milliseconds (default: 60 seconds)
 * @returns `true` if the request is allowed, `false` if rate limited
 */
export function checkRateLimit(
  userId: string,
  route: string,
  maxRequests = 10,
  windowMs = 60 * 1000
): boolean {
  cleanup(windowMs);

  const key = `${userId}:${route}`;
  const now = Date.now();

  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (entry.timestamps.length >= maxRequests) {
    return false; // Rate limited
  }

  entry.timestamps.push(now);
  return true; // Allowed
}

/**
 * Get the remaining time (in seconds) until the rate limit resets.
 */
export function getRateLimitReset(userId: string, route: string, windowMs = 60 * 1000): number {
  const key = `${userId}:${route}`;
  const entry = store.get(key);

  if (!entry || entry.timestamps.length === 0) return 0;

  const oldestTimestamp = Math.min(...entry.timestamps);
  const resetTime = oldestTimestamp + windowMs;
  const remaining = Math.max(0, Math.ceil((resetTime - Date.now()) / 1000));

  return remaining;
}
