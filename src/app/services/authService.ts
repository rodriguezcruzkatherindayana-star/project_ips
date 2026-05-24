import { createTokenPair, decodeToken, isTokenExpired, saveRefreshToken, loadRefreshToken, removeRefreshToken } from './jwtService';
import type { JwtPayload } from './jwtService';
import type { User } from '../contexts/AppContext';

// ── Mock user database ────────────────────────────────────────────────────────
// Replace with real API calls when backend is available.
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    name: 'María García López',
    email: 'maria.garcia@email.com',
    password: 'password',
    role: 'patient',
    documentId: '1023456789',
    phone: '300-456-7890',
    eps: 'Sura EPS',
    birthDate: '1985-06-15',
    address: 'Cra 7 #45-23, Bogotá',
    emergencyContact: { name: 'Carlos García', phone: '310-987-6543' },
    bloodType: 'O+',
    allergies: ['Penicilina', 'Aspirina'],
    chronicConditions: ['Hipertensión leve'],
  },
  {
    id: '2',
    name: 'Demo Usuario',
    email: 'demo@integra.com',
    password: 'demo123',
    role: 'patient',
    documentId: '9876543210',
    phone: '315-000-0001',
    eps: 'Nueva EPS',
  },
  {
    id: '3',
    name: 'Dr. Carlos Mendoza',
    email: 'carlos.mendoza@integra.com',
    password: 'doctor123',
    role: 'doctor',
    documentId: '5432167890',
    phone: '310-111-2233',
    eps: 'N/A',
  },
];

export interface AuthResult {
  user: User;
  accessToken: string;
}

export interface AuthError {
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'TOKEN_EXPIRED' | 'NETWORK_ERROR';
  message: string;
}

function userToPayload(user: User): Omit<JwtPayload, 'iat' | 'exp'> {
  return {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    documentId: user.documentId,
    phone: user.phone,
    eps: user.eps,
  };
}

function payloadToUser(payload: JwtPayload): User {
  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    documentId: payload.documentId,
    phone: payload.phone,
    eps: payload.eps,
  };
}

// Simulates network latency for realistic UX
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function login(email: string, password: string): Promise<AuthResult> {
  await delay(800); // simulate API call

  const found = MOCK_USERS.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!found) {
    throw { code: 'INVALID_CREDENTIALS', message: 'Correo o contraseña incorrectos' } as AuthError;
  }

  const { password: _, ...user } = found;
  const { accessToken, refreshToken } = createTokenPair(userToPayload(user));
  saveRefreshToken(refreshToken);
  return { user, accessToken };
}

export async function loginWithBiometrics(): Promise<AuthResult> {
  await delay(1200); // simulate biometric check
  // Default to the first mock user for biometric login
  const { password: _, ...user } = MOCK_USERS[0];
  const { accessToken, refreshToken } = createTokenPair(userToPayload(user));
  saveRefreshToken(refreshToken);
  return { user, accessToken };
}

export async function refreshSession(): Promise<AuthResult | null> {
  const refreshToken = loadRefreshToken();
  if (!refreshToken || isTokenExpired(refreshToken)) {
    removeRefreshToken();
    return null;
  }

  await delay(300);
  const payload = decodeToken(refreshToken);
  if (!payload) return null;

  const user = payloadToUser(payload);
  const { accessToken, refreshToken: newRefreshToken } = createTokenPair(userToPayload(user));
  saveRefreshToken(newRefreshToken); // rotate refresh token
  return { user, accessToken };
}

export function logout(): void {
  removeRefreshToken();
}

export function hasStoredSession(): boolean {
  const token = loadRefreshToken();
  return !!token && !isTokenExpired(token);
}
