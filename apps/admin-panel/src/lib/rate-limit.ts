import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit'
});

export async function rateLimit(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  const headers = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  };

  if (!success) {
    return {
      success: false,
      headers,
      message: 'Too many requests. Please try again later.'
    };
  }

  return {
    success: true,
    headers
  };
} 