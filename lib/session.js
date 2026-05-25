// lib/session.js — Admin session helpers (server-side only)
import { cookies } from 'next/headers';

const COOKIE_NAME = 'iun_admin_session';

export function getAdminSession() {
  const store = cookies();
  const token = store.get(COOKIE_NAME);
  return token?.value === process.env.ADMIN_SESSION_SECRET ? true : false;
}

export function setAdminSessionCookie(response) {
  response.headers.set(
    'Set-Cookie',
    `${COOKIE_NAME}=${process.env.ADMIN_SESSION_SECRET}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
  );
}

export function clearAdminSessionCookie(response) {
  response.headers.set(
    'Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
  );
}
