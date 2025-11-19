// Frontend API helpers
// Provides a callAI(prompt) function that forwards the prompt to the backend AI proxy.
// Usage:
// import { callAI } from './util/api';
// const res = await callAI('Summarize this...');

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function postJSON(path, body, opts = {}) {
	const fetchOpts = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	};

	// allow optional credentials (cookies) if caller requests it
	if (opts.withCredentials) fetchOpts.credentials = 'include';

	const res = await fetch(`${API_BASE}${path}`, fetchOpts);
	if (!res.ok) {
		const t = await res.text();
		throw new Error(t || `HTTP ${res.status}`);
	}
	return res.json();
}

/**
 * callAI - send a prompt to the backend AI proxy (/api/ai/generate)
 * @param {string} prompt
 * @param {{model?: string}} options
 * @returns {Promise<any>} provider response (shape depends on backend/provider)
 */
export async function callAI(prompt, options = {}) {
	if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
	const payload = { prompt, model: options.model };
	const json = await postJSON('/api/ai/generate', payload, { withCredentials: !!options.withCredentials });
	return json;
}

 

// ---- Auth helpers ----
export async function login(email, password, recaptchaToken) {
	return await postJSON('/api/auth/login', { email, password, recaptchaToken }, { withCredentials: true });
}

export async function signup(payload) {
	return await postJSON('/api/auth/signup', payload, { withCredentials: true });
}

export async function refreshAuth() {
	return await postJSON('/api/auth/refresh-token', {}, { withCredentials: true });
}

export async function logout() {
	return await postJSON('/api/auth/logout', {}, { withCredentials: true });
}

export function getGoogleAuthUrl() {
	return `${API_BASE}/api/auth/google`;
}

export function getLinkedInAuthUrl() {
	return `${API_BASE}/api/auth/linkedin`;
}

export default { callAI, login, signup, refreshAuth, logout, getGoogleAuthUrl, getLinkedInAuthUrl };
