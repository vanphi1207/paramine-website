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
  // Tuỳ chọn: backend có thể trả về vai trò tài khoản (vd: "ADMIN", "USER").
  // Nếu backend hiện chưa trả field này, hãy bổ sung nó ở API đăng nhập/đăng ký
  // để việc phân quyền admin ở dưới hoạt động chính xác.
  role?: string;
}

// Danh sách username được coi là admin ngay cả khi backend chưa trả về `role`.
// Cấu hình qua biến môi trường VITE_ADMIN_USERNAMES, cách nhau bởi dấu phẩy.
// Ví dụ: VITE_ADMIN_USERNAMES=vanphi1207,ownerName
const ADMIN_USERNAMES = ((import.meta as any).env.VITE_ADMIN_USERNAMES || "")
  .split(",")
  .map((u: string) => u.trim().toLowerCase())
  .filter(Boolean);

export function isAdminAccount(
  account: AccountView | null | undefined,
): boolean {
  if (!account) return false;
  if (account.role && account.role.toUpperCase() === "ADMIN") return true;
  return ADMIN_USERNAMES.includes(account.username.toLowerCase());
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

function get<T>(path: string) {
  return request<T>(path, { method: "GET" });
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

// ---- Admin dashboard ----
// Các endpoint dưới đây là dự đoán hợp lý dựa theo quy ước của /auth/*.
// Hãy đổi lại path cho khớp với backend thực tế (vd: /api/v1/admin/...).

export interface AdminOverviewStats {
  totalAccounts: number;
  premiumAccounts: number;
  onlineNow: number;
  newAccountsToday: number;
}

export interface AdminAccountRow {
  id: string;
  username: string;
  email: string;
  premium: boolean;
  banned: boolean;
  createdAt?: string;
}

export const adminApi = {
  getOverview: () => get<AdminOverviewStats>("/admin/overview"),

  listAccounts: (search: string = "") =>
    get<AdminAccountRow[]>(
      `/admin/accounts${search ? `?search=${encodeURIComponent(search)}` : ""}`,
    ),

  setAccountBanned: (id: string, banned: boolean) =>
    post<void>(`/admin/accounts/${id}/status`, { banned }),
};
