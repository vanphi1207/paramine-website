const API_URL =
  (import.meta as any).env.VITE_API_URL || "http://localhost:8080";

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

async function post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as ApiResponse<T>;
  return data;
}

export const authApi = {
  login: (username: string, password: string) =>
    post<AccountView>("/api/auth/login", { username, password }),

  register: (username: string, password: string, email: string) =>
    post<AccountView>("/api/auth/register", { username, password, email }),

  changePassword: (
    username: string,
    currentPassword: string,
    newPassword: string,
  ) =>
    post<void>("/api/auth/change-password", {
      username,
      currentPassword,
      newPassword,
    }),
};
