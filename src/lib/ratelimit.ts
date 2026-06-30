import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "./redis";

export function getWaitlistRateLimit() {
  const redis = getRedis();
  if (!redis) return null;

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    prefix: "findivo:waitlist",
  });
}
