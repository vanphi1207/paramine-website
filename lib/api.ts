const API_URL =
  (import.meta as any).env.VITE_API_URL || "http://localhost:8080/api/v1";

const TOKEN_KEY = "paramine.token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export interface AccountView {
  username: string;
  uniqueId: string;
  premium: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface BackendResponse<T> {
  code: number;
  message?: string;
  result?: T;
}

interface AuthenticationResult {
  token: string;
  authenticated: boolean;
  account: AccountView;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  let res: Response;
  try {
    const token = getToken();
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    return {
      success: false,
      message: "Không thể kết nối tới máy chủ, thử lại sau.",
      data: null,
    };
  }

  let body: BackendResponse<T> | null = null;
  try {
    body = await res.json();
  } catch {}

  const success = res.ok && (!body || body.code === 1000);

  return {
    success,
    message: body?.message ?? (success ? "" : `Lỗi máy chủ (${res.status})`),
    data: success ? ((body?.result as T) ?? null) : null,
  };
}

function post<T>(path: string, body: unknown) {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) });
}

async function authenticate(
  path: string,
  body: unknown,
): Promise<ApiResponse<AccountView>> {
  const res = await post<AuthenticationResult>(path, body);
  if (res.success && res.data) {
    setToken(res.data.token);
    return { success: true, message: res.message, data: res.data.account };
  }
  return { success: false, message: res.message, data: null };
}

export const authApi = {
  login: (username: string, password: string) =>
    authenticate("/auth/login", { username, password }),

  register: (username: string, password: string, email: string) =>
    authenticate("/auth/register", { username, password, email }),

  changePassword: (
    username: string,
    currentPassword: string,
    newPassword: string,
  ) =>
    post<void>("/auth/change-password", {
      username,
      currentPassword,
      newPassword,
    }),

  logout: async (): Promise<void> => {
    const token = getToken();
    setToken(null);
    if (!token) return;
    try {
      await post<void>("/auth/logout", { token });
    } catch {}
  },
};
