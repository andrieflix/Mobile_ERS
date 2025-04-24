export const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-key-change-in-production';
export const TOKEN_COOKIE_NAME = 'token';
export const TOKEN_EXPIRY = 24 * 60 * 60; // 1 day in seconds 