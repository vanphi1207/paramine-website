import React, { useEffect, useState, useCallback } from "react";
import {
  ArrowLeft,
  LayoutDashboard,
  Users,
  RefreshCw,
  Search,
  Ban,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  Crown,
  UserPlus,
  Wifi,
} from "lucide-react";
import {
  AccountView,
  AdminAccountRow,
  AdminOverviewStats,
  adminApi,
} from "../../lib/api";

type Tab = "overview" | "accounts";

interface AdminDashboardProps {
  account: AccountView;
  onBack: () => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.75rem 0.65rem 2.5rem",
  background: "var(--panel)",
  border: "2px solid var(--panel-dark)",
  color: "var(--text)",
  fontFamily: "var(--mono)",
  fontSize: "0.9rem",
  boxShadow:
    "inset 2px 2px 0 var(--border-light), inset -3px -3px 0 var(--panel-shade)",
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ account, onBack }) => {
  const [tab, setTab] = useState<Tab>("overview");

  const [stats, setStats] = useState<AdminOverviewStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [accounts, setAccounts] = useState<AdminAccountRow[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountsError, setAccountsError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const res = await adminApi.getOverview();
      if (res.success && res.data) {
        setStats(res.data);
      } else {
        setStatsError(
          res.message || "Không thể tải số liệu tổng quan từ máy chủ.",
        );
      }
    } catch {
      setStatsError("Không thể kết nối tới máy chủ, thử lại sau.");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const loadAccounts = useCallback(async (query: string) => {
    setAccountsLoading(true);
    setAccountsError(null);
    try {
      const res = await adminApi.listAccounts(query);
      if (res.success && res.data) {
        setAccounts(res.data);
      } else {
        setAccounts([]);
        setAccountsError(
          res.message || "Không thể tải danh sách tài khoản từ máy chủ.",
        );
      }
    } catch {
      setAccountsError("Không thể kết nối tới máy chủ, thử lại sau.");
    } finally {
      setAccountsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    if (tab === "accounts") {
      loadAccounts(search);
    }
  }, [tab]);

  const handleToggleBan = async (row: AdminAccountRow) => {
    setBusyId(row.id);
    try {
      const res = await adminApi.setAccountBanned(row.id, !row.banned);
      if (res.success) {
        setAccounts((prev) =>
          prev.map((a) => (a.id === row.id ? { ...a, banned: !a.banned } : a)),
        );
      } else {
        setAccountsError(res.message || "Thao tác thất bại, thử lại sau.");
      }
    } catch {
      setAccountsError("Không thể kết nối tới máy chủ, thử lại sau.");
    } finally {
      setBusyId(null);
    }
  };

  const statCards = [
    {
      label: "Tổng tài khoản",
      value: stats?.totalAccounts,
      icon: Users,
      color: "var(--diamond)",
    },
    {
      label: "Tài khoản Premium",
      value: stats?.premiumAccounts,
      icon: Crown,
      color: "var(--sandstone)",
    },
    {
      label: "Đang online",
      value: stats?.onlineNow,
      icon: Wifi,
      color: "var(--grass)",
    },
    {
      label: "Đăng ký hôm nay",
      value: stats?.newAccountsToday,
      icon: UserPlus,
      color: "#ff9f6b",
    },
  ];

  return (
    <div style={{ padding: "2rem", minHeight: "70vh" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}
          >
            <span
              style={{
                width: "42px",
                height: "42px",
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--grass)",
                boxShadow:
                  "inset 2px 2px 0 var(--button-highlight), inset -3px -3px 0 var(--button-shade)",
              }}
            >
              <ShieldCheck
                style={{ width: "22px", height: "22px", color: "#fff" }}
              />
            </span>
            <div>
              <h1
                style={{
                  fontFamily: "var(--pixel)",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Bảng Điều Khiển Quản Trị
              </h1>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-dim)",
                  margin: "4px 0 0",
                }}
              >
                Xin chào, {account.username}
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="btn btn-secondary"
            style={{ fontSize: "0.85rem" }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} />
            Về trang chủ
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            background: "var(--button-bg)",
            padding: "0.3rem",
            width: "fit-content",
            boxShadow:
              "inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)",
          }}
        >
          <button
            onClick={() => setTab("overview")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.55rem 1rem",
              fontSize: "0.85rem",
              fontFamily: "var(--pixel)",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              background: tab === "overview" ? "var(--grass)" : "transparent",
              color: tab === "overview" ? "white" : "var(--text-dim)",
              transition: "all 0.1s",
            }}
          >
            <LayoutDashboard style={{ width: "15px", height: "15px" }} />
            Tổng quan
          </button>
          <button
            onClick={() => setTab("accounts")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.55rem 1rem",
              fontSize: "0.85rem",
              fontFamily: "var(--pixel)",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              background: tab === "accounts" ? "var(--grass)" : "transparent",
              color: tab === "accounts" ? "white" : "var(--text-dim)",
              transition: "all 0.1s",
            }}
          >
            <Users style={{ width: "15px", height: "15px" }} />
            Tài khoản
          </button>
        </div>

        {/* Overview tab */}
        {tab === "overview" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="panel"
                  style={{ padding: "1.25rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}
                    >
                      {card.label}
                    </span>
                    <card.icon
                      style={{
                        width: "18px",
                        height: "18px",
                        color: card.color,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--pixel)",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "var(--text)",
                    }}
                  >
                    {statsLoading ? (
                      <Loader2
                        style={{
                          width: "20px",
                          height: "20px",
                          animation: "spin 1s linear infinite",
                        }}
                      />
                    ) : card.value !== undefined ? (
                      card.value
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
              ))}
            </div>

            {statsError && (
              <div
                className="panel"
                style={{
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  borderColor: "rgba(255, 107, 107, 0.4)",
                }}
              >
                <AlertTriangle
                  style={{
                    width: "18px",
                    height: "18px",
                    color: "#ff6b6b",
                    flex: "0 0 auto",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-dim)",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {statsError}
                </p>
                <button
                  onClick={loadStats}
                  className="btn btn-secondary"
                  style={{ fontSize: "0.75rem", padding: "8px 14px" }}
                >
                  <RefreshCw style={{ width: "14px", height: "14px" }} />
                  Thử lại
                </button>
              </div>
            )}
          </div>
        )}

        {/* Accounts tab */}
        {tab === "accounts" && (
          <div className="panel" style={{ padding: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ position: "relative", flex: "1 1 240px" }}>
                <Search
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "16px",
                    height: "16px",
                    color: "var(--text-dim)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Tìm theo username hoặc email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") loadAccounts(search);
                  }}
                  style={inputStyle}
                />
              </div>
              <button
                onClick={() => loadAccounts(search)}
                className="btn btn-secondary"
                style={{ fontSize: "0.85rem" }}
              >
                <RefreshCw style={{ width: "16px", height: "16px" }} />
                Làm mới
              </button>
            </div>

            {accountsError && (
              <div
                style={{
                  padding: "0.85rem 1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "rgba(255, 107, 107, 0.1)",
                  border: "1px solid rgba(255, 107, 107, 0.3)",
                }}
              >
                <AlertTriangle
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#ff6b6b",
                    flex: "0 0 auto",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-dim)",
                    margin: 0,
                  }}
                >
                  {accountsError}
                </p>
              </div>
            )}

            {accountsLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2rem",
                }}
              >
                <Loader2
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "var(--text-dim)",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
            ) : accounts.length === 0 ? (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-dim)",
                  padding: "1rem 0",
                  textAlign: "center",
                }}
              >
                Không có tài khoản nào để hiển thị.
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "var(--mono)",
                    fontSize: "0.85rem",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "2px solid var(--panel-dark)",
                        textAlign: "left",
                      }}
                    >
                      <th
                        style={{
                          padding: "0.6rem 0.5rem",
                          color: "var(--text-dim)",
                          fontWeight: 700,
                        }}
                      >
                        Username
                      </th>
                      <th
                        style={{
                          padding: "0.6rem 0.5rem",
                          color: "var(--text-dim)",
                          fontWeight: 700,
                        }}
                      >
                        Email
                      </th>
                      <th
                        style={{
                          padding: "0.6rem 0.5rem",
                          color: "var(--text-dim)",
                          fontWeight: 700,
                        }}
                      >
                        Premium
                      </th>
                      <th
                        style={{
                          padding: "0.6rem 0.5rem",
                          color: "var(--text-dim)",
                          fontWeight: 700,
                        }}
                      >
                        Trạng thái
                      </th>
                      <th
                        style={{
                          padding: "0.6rem 0.5rem",
                          color: "var(--text-dim)",
                          fontWeight: 700,
                        }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((row) => (
                      <tr
                        key={row.id}
                        style={{ borderBottom: "1px solid var(--border-dark)" }}
                      >
                        <td
                          style={{
                            padding: "0.65rem 0.5rem",
                            color: "var(--text)",
                          }}
                        >
                          {row.username}
                        </td>
                        <td
                          style={{
                            padding: "0.65rem 0.5rem",
                            color: "var(--text-dim)",
                          }}
                        >
                          {row.email}
                        </td>
                        <td style={{ padding: "0.65rem 0.5rem" }}>
                          {row.premium ? (
                            <span style={{ color: "var(--sandstone)" }}>
                              Có
                            </span>
                          ) : (
                            <span style={{ color: "var(--text-dim)" }}>
                              Không
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "0.65rem 0.5rem" }}>
                          {row.banned ? (
                            <span style={{ color: "#ff6b6b" }}>Đã cấm</span>
                          ) : (
                            <span style={{ color: "var(--grass)" }}>
                              Hoạt động
                            </span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "0.65rem 0.5rem",
                            textAlign: "right",
                          }}
                        >
                          <button
                            onClick={() => handleToggleBan(row)}
                            disabled={busyId === row.id}
                            className={
                              row.banned
                                ? "btn btn-primary"
                                : "btn btn-secondary"
                            }
                            style={{
                              fontSize: "0.75rem",
                              padding: "8px 14px",
                              opacity: busyId === row.id ? 0.6 : 1,
                            }}
                          >
                            {busyId === row.id ? (
                              <Loader2
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  animation: "spin 1s linear infinite",
                                }}
                              />
                            ) : row.banned ? (
                              <CheckCircle2
                                style={{ width: "14px", height: "14px" }}
                              />
                            ) : (
                              <Ban style={{ width: "14px", height: "14px" }} />
                            )}
                            {row.banned ? "Bỏ cấm" : "Cấm"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
