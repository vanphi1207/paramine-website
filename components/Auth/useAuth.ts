import { useCallback, useEffect, useState } from "react";
import { AccountView, authApi } from "../../lib/api.ts";

const STORAGE_KEY = "paramine.account";

export function useAuth() {
  const [account, setAccount] = useState<AccountView | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setAccount(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const persist = (acc: AccountView | null) => {
    setAccount(acc);
    if (acc) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acc));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = useCallback(async (username: string, password: string) => {
    const res = await authApi.login(username, password);
    if (res.success && res.data) {
      persist(res.data);
    }
    return res;
  }, []);

  const register = useCallback(
    async (username: string, password: string, email: string) => {
      const res = await authApi.register(username, password, email);
      if (res.success && res.data) {
        persist(res.data);
      }
      return res;
    },
    [],
  );

  const logout = useCallback(() => {
    persist(null);
    authApi.logout();
  }, []);

  return { account, login, register, logout };
}
