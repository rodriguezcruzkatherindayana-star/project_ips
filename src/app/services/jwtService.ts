// JWT simulation for frontend — compatible with a real backend swap
// Access token lives in memory only; refresh token persists in localStorage.

const ACCESS_TOKEN_TTL = 15 * 60;       // 15 min (seconds)
const REFRESH_TOKEN_TTL = 7 * 24 * 3600; // 7 days (seconds)
const REFRESH_TOKEN_KEY = 'integra_refresh_token';

export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  documentId: string;
  phone: string;
  eps: string;
  iat: number;
  exp: number;
}

function base64url(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64urlDecode(str: string): string {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  return atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad);
}

function sign(payload: object, secret: string): string {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify(payload));
  // Simulated signature: hash of header.body.secret
  const raw = `${header}.${body}.${secret}`;
  const sig = base64url(
    Array.from(raw)
      .reduce((acc, c) => acc + c.charCodeAt(0), 0)
      .toString(36)
  );
  return `${header}.${body}.${sig}`;
}

export function createTokenPair(payload: Omit<JwtPayload, 'iat' | 'exp'>, secret = 'integra-ips-secret'): {
  accessToken: string;
  refreshToken: string;
} {
  const now = Math.floor(Date.now() / 1000);
  const accessToken = sign({ ...payload, iat: now, exp: now + ACCESS_TOKEN_TTL }, secret);
  const refreshToken = sign({ ...payload, iat: now, exp: now + REFRESH_TOKEN_TTL }, secret);
  return { accessToken, refreshToken };
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(base64urlDecode(parts[1])) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) return true;
  return Math.floor(Date.now() / 1000) >= payload.exp;
}

export function getSecondsUntilExpiry(token: string): number {
  const payload = decodeToken(token);
  if (!payload) return 0;
  return Math.max(0, payload.exp - Math.floor(Date.now() / 1000));
}

// Refresh token persistence
export function saveRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function loadRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function removeRefreshToken(): void {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
