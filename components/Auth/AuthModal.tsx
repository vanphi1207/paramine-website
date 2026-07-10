import React, { useState } from "react";
import { X, User, Lock, Mail, Loader2 } from "lucide-react";
import { AccountView, ApiResponse } from "../../lib/api.ts";

type Mode = "login" | "register";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (
    username: string,
    password: string,
  ) => Promise<ApiResponse<AccountView>>;
  onRegister: (
    username: string,
    password: string,
    email: string,
  ) => Promise<ApiResponse<AccountView>>;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) => {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const reset = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setError(null);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res =
        mode === "login"
          ? await onLogin(username, password)
          : await onRegister(username, password, email);

      if (!res.success) {
        setError(res.message);
        return;
      }
      handleClose();
    } catch {
      setError("Không thể kết nối tới máy chủ, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.7)",
          cursor: "pointer"
        }}
        onClick={handleClose}
      />

      <div className="panel" style={{
        position: "relative",
        width: "100%",
        maxWidth: "360px",
        padding: "2rem"
      }}>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            color: "var(--text-dim)",
            cursor: "pointer",
            fontSize: "1.25rem"
          }}
        >
          <X style={{ width: "20px", height: "20px" }} />
        </button>

        <h2 style={{
          fontFamily: "var(--pixel)",
          fontSize: "1.3rem",
          fontWeight: "800",
          letterSpacing: "0.5px",
          color: "var(--text)",
          margin: "0 0 0.5rem"
        }}>
          {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
        </h2>
        <p style={{
          fontSize: "0.85rem",
          color: "var(--text-dim)",
          margin: "0 0 1.5rem"
        }}>
          Dùng chung tài khoản với máy chủ Minecraft của bạn.
        </p>

        <div style={{
          display: "flex",
          marginBottom: "1.5rem",
          gap: "0.5rem",
          background: "var(--button-bg)",
          padding: "0.25rem",
          boxShadow: "inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)"
        }}>
          <button
            type="button"
            onClick={() => switchMode("login")}
            style={{
              flex: 1,
              padding: "0.5rem",
              fontSize: "0.85rem",
              fontFamily: "var(--pixel)",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              background: mode === "login" ? "var(--grass)" : "transparent",
              color: mode === "login" ? "white" : "var(--text-dim)",
              transition: "all 0.1s"
            }}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => switchMode("register")}
            style={{
              flex: 1,
              padding: "0.5rem",
              fontSize: "0.85rem",
              fontFamily: "var(--pixel)",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              background: mode === "register" ? "var(--grass)" : "transparent",
              color: mode === "register" ? "white" : "var(--text-dim)",
              transition: "all 0.1s"
            }}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ position: "relative" }}>
            <User style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "16px",
              height: "16px",
              color: "var(--text-dim)"
            }} />
            <input
              type="text"
              placeholder="Tên tài khoản trong game"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                background: "var(--panel)",
                border: "2px solid var(--panel-dark)",
                color: "var(--text)",
                fontFamily: "var(--mono)",
                fontSize: "0.9rem",
                boxShadow: "inset 2px 2px 0 var(--border-light), inset -3px -3px 0 var(--panel-shade)"
              }}
            />
          </div>

          {mode === "register" && (
            <div style={{ position: "relative" }}>
              <Mail style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "var(--text-dim)"
              }} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  background: "var(--panel)",
                  border: "2px solid var(--panel-dark)",
                  color: "var(--text)",
                  fontFamily: "var(--mono)",
                  fontSize: "0.9rem",
                  boxShadow: "inset 2px 2px 0 var(--border-light), inset -3px -3px 0 var(--panel-shade)"
                }}
              />
            </div>
          )}

          <div style={{ position: "relative" }}>
            <Lock style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "16px",
              height: "16px",
              color: "var(--text-dim)"
            }} />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                background: "var(--panel)",
                border: "2px solid var(--panel-dark)",
                color: "var(--text)",
                fontFamily: "var(--mono)",
                fontSize: "0.9rem",
                boxShadow: "inset 2px 2px 0 var(--border-light), inset -3px -3px 0 var(--panel-shade)"
              }}
            />
          </div>

          {error && (
            <p style={{
              fontSize: "0.85rem",
              color: "#ff6b6b",
              background: "rgba(255, 107, 107, 0.1)",
              border: "1px solid rgba(255, 107, 107, 0.3)",
              padding: "0.75rem",
              margin: 0
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading && <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />}
            {mode === "login" ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
