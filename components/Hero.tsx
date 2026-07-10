import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { SERVER_IP } from "../constants";
import MinecraftAvatar3D from "./MinecraftAvatar3D";

interface OnlinePlayer {
  uuid: string;
  name_clean: string;
}

interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  icon: string | null;
  sample: OnlinePlayer[];
}

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://api.mcstatus.io/v2/status/java/${SERVER_IP}`,
        );
        const data = await response.json();
        setServerStatus({
          online: data.online,
          players: data.players?.online || 0,
          maxPlayers: data.players?.max || 0,
          icon: data.icon || null,
          sample: (data.players?.list || []).map((p: any) => ({
            uuid: p.uuid,
            name_clean: p.name_clean,
          })),
        });
      } catch (error) {
        console.error("Error fetching server status:", error);
        setServerStatus({
          online: false,
          players: 0,
          maxPlayers: 0,
          icon: null,
          sample: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      style={{
        padding: "4rem 2rem 3rem",
        overflow: "hidden"
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: "3rem",
        alignItems: "center",
        maxWidth: "1180px",
        margin: "0 auto"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1.25rem"
        }}>
          <h1 style={{
            fontFamily: "var(--pixel)",
            fontWeight: "800",
            letterSpacing: "2px",
            lineHeight: "1",
            fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
            color: "var(--text)",
            margin: "0"
          }}>
            PARAMINE
          </h1>

          <p style={{
            color: "var(--text-dim)",
            fontSize: "1.05rem",
            lineHeight: "1.6",
            maxWidth: "32ch",
            margin: "0"
          }}>
            Máy chủ Minecraft sinh tồn đỉnh cao tại Việt Nam. Khám phá thế giới mới, xây dựng đế chế.
          </p>

          <button
            onClick={handleCopy}
            className="btn btn-primary"
            title="Nhấn để sao chép"
            style={{
              marginTop: "0.5rem"
            }}
          >
            {copied ? "Đã copy!" : SERVER_IP}
          </button>

          <span style={{
            color: "var(--text-dim)",
            fontSize: "0.85rem",
            marginTop: "0.5rem"
          }}>
            {loading ? (
              "Đang tải trạng thái server..."
            ) : serverStatus?.online ? (
              <span>
                <span style={{ fontFamily: "var(--mono)", color: "var(--text)" }}>
                  {serverStatus.players}
                </span> người chơi đang online
              </span>
            ) : (
              <span style={{ color: "#ff6b6b" }}>Server đang offline</span>
            )}
          </span>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <MinecraftAvatar3D
            username={"qwcankk"}
            width={320}
            height={420}
            animation="wave"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
