// Fetch current user profile
export async function getProfile() {
	const API_BASE = import.meta.env.VITE_API_URL || '';
	const res = await fetch(`${API_BASE}/api/auth/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(localStorage.getItem('accessToken') ? { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') } : {})
		},
		credentials: 'include',
	});
	if (!res.ok) throw new Error(await res.text());
	return res.json();
}
// Update user profile
export async function updateProfile(profile) {
	// PATCH or PUT to /api/auth/profile (adjust endpoint as needed)
	const res = await fetch(`${API_BASE}/api/auth/profile`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			// Optionally add Authorization header if needed
			...(localStorage.getItem('accessToken') ? { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') } : {})
		},
		credentials: 'include',
		body: JSON.stringify(profile)
	});
	if (!res.ok) throw new Error(await res.text());
	return res.json();
}
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

export async function addContent(payload) {
	return await postJSON('/api/content', payload, { withCredentials: true });
}

export async function addYouTubeVideo(courseId, title, youtubeUrl) {
	return await postJSON('/api/content/youtube', { courseId, title, youtubeUrl }, { withCredentials: true });
}

export async function cutVideo(contentId, startTime, endTime) {
	return await postJSON('/api/content/cut', { contentId, startTime, endTime }, { withCredentials: true });
}

// ---- Auth helpers ----
export async function login(email, password, recaptchaToken) {
	const res = await postJSON('/api/auth/login', { email, password, recaptchaToken }, { withCredentials: true });
	// Store accessToken if present
	const accessToken = res?.data?.accessToken || res?.accessToken;
	if (accessToken) localStorage.setItem('accessToken', accessToken);
	return res;
}

export async function signup(payload) {
	const res = await postJSON('/api/auth/signup', payload, { withCredentials: true });
	const accessToken = res?.data?.accessToken || res?.accessToken;
	if (accessToken) localStorage.setItem('accessToken', accessToken);
	return res;
}

export async function refreshAuth() {
	const res = await postJSON('/api/auth/refresh-token', {}, { withCredentials: true });
	const accessToken = res?.data?.accessToken || res?.accessToken;
	if (accessToken) localStorage.setItem('accessToken', accessToken);
	return res;
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

export async function registerInstitution(payload) {
	return await postJSON('/api/auth/register-institution', payload);
}

export async function registerSuperAdmin(payload) {
	return await postJSON('/api/auth/register-superadmin', payload);
}

export default { callAI, login, signup, refreshAuth, logout, getGoogleAuthUrl, getLinkedInAuthUrl };
