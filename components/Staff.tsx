import React, { useState, useEffect } from "react";
import { STAFF_MEMBERS } from "../constants";
import {
  MessageSquare,
  X,
  Box,
  User,
  Facebook,
  ExternalLink,
} from "lucide-react";
import Reveal from "./Reveal";
import MinecraftAvatar3D from "./MinecraftAvatar3D";
import { StaffMember } from "../types";

const Staff: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Đóng modal bằng phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStaff(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Khóa scroll nền khi modal đang mở
  useEffect(() => {
    document.body.style.overflow = selectedStaff ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStaff]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "Admin":
        return "bg-red-500/10 text-red-300 border-red-500/30";
      case "Developer":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "Moderator":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "Builder":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
    }
  };

  return (
    <section id="staff" style={{ padding: "4rem 2rem", background: "transparent" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{
              fontFamily: "var(--pixel)",
              fontSize: "1.75rem",
              fontWeight: "800",
              letterSpacing: "1px",
              color: "var(--text)",
              margin: "0 0 1rem 0"
            }}>
              Đội Ngũ Ban Quản Trị
            </h2>
            <p style={{ color: "var(--text-dim)", margin: "0.5rem 0 0" }}>
              Những người hùng thầm lặng vận hành Paramine.
            </p>
          </div>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem"
        }}>
          {STAFF_MEMBERS.map((staff, index) => (
            <Reveal key={staff.id} delay={index * 100}>
              <div className="panel" style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1rem"
              }}>
                <div style={{ position: "relative", marginBottom: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedStaff(staff)}
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "2px solid var(--panel-dark)",
                      padding: "0",
                      cursor: "pointer",
                      overflow: "hidden",
                      background: "var(--panel-dark)",
                      boxShadow: "inset 2px 2px 0 var(--button-highlight), inset -3px -3px 0 var(--button-shade)",
                      transition: "transform 0.15s"
                    }}
                    title="Xem model 3D"
                  >
                    <img
                      src={staff.avatarUrl}
                      alt={staff.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        imageRendering: "pixelated"
                      }}
                      loading="lazy"
                    />
                  </button>
                  <span style={{
                    position: "absolute",
                    bottom: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: "var(--pixel)",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    padding: "3px 8px",
                    background: "var(--button-bg)",
                    border: "1px solid var(--panel-dark)",
                    color: "var(--text)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    boxShadow: "0 2px 0 var(--panel-dark)"
                  }}>
                    {staff.role}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--pixel)",
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "var(--text)",
                  margin: "0.75rem 0 0"
                }}>
                  {staff.name}
                </h3>
                <p style={{
                  color: "var(--text-dim)",
                  fontSize: "0.85rem",
                  lineHeight: "1.5",
                  margin: "0",
                  minHeight: "40px"
                }}>
                  {staff.description}
                </p>

                {staff.contact && (
                  <div style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.75rem",
                    color: "var(--text-dim)",
                    fontFamily: "var(--mono)",
                    background: "var(--term-bg)",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid var(--term-border)"
                  }}>
                    <MessageSquare style={{ width: "12px", height: "12px" }} />
                    <span>{staff.contact}</span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedStaff && (
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
            onClick={() => setSelectedStaff(null)}
          />

          <div className="panel" style={{
            position: "relative",
            width: "100%",
            maxWidth: "360px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}>
            <button
              onClick={() => setSelectedStaff(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "32px",
                height: "32px",
                background: "var(--button-bg)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-dim)",
                boxShadow: "inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)"
              }}
            >
              <X style={{ width: "18px", height: "18px" }} />
            </button>

            <span style={{
              fontFamily: "var(--pixel)",
              marginBottom: "1rem",
              padding: "3px 8px",
              background: "var(--button-bg)",
              border: "1px solid var(--panel-dark)",
              fontSize: "0.7rem",
              fontWeight: "700",
              color: "var(--text)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              boxShadow: "0 2px 0 var(--panel-dark)"
            }}>
              {selectedStaff.role}
            </span>

            <div style={{ marginBottom: "1rem" }}>
              <MinecraftAvatar3D
                username={selectedStaff.username}
                width={220}
                height={280}
                animation="walk"
              />
            </div>

            <h3 style={{
              fontFamily: "var(--pixel)",
              fontSize: "1.3rem",
              fontWeight: "800",
              letterSpacing: "0.5px",
              color: "var(--text)",
              margin: "0 0 0.5rem"
            }}>
              {selectedStaff.name}
            </h3>
            <p style={{
              color: "var(--text-dim)",
              fontSize: "0.9rem",
              lineHeight: "1.5",
              marginBottom: "1rem"
            }}>
              {selectedStaff.description}
            </p>

            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="panel" style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                fontSize: "0.85rem"
              }}>
                <User style={{ width: "16px", height: "16px", color: "var(--nav-accent)", flexShrink: 0 }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{
                    fontSize: "0.65rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem"
                  }}>
                    Username Minecraft
                  </div>
                  <div style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.9rem",
                    color: "var(--text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {selectedStaff.username}
                  </div>
                </div>
              </div>

              {selectedStaff.contact && (
                <a
                  href={selectedStaff.discordUrl || "#"}
                  target={selectedStaff.discordUrl ? "_blank" : undefined}
                  rel={selectedStaff.discordUrl ? "noopener noreferrer" : undefined}
                  className="panel"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    cursor: selectedStaff.discordUrl ? "pointer" : "default"
                  }}
                >
                  <MessageSquare style={{ width: "16px", height: "16px", color: "#5865F2", flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontSize: "0.65rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      marginBottom: "0.25rem"
                    }}>
                      Discord
                    </div>
                    <div style={{
                      fontSize: "0.9rem",
                      color: "var(--text)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {selectedStaff.contact}
                    </div>
                  </div>
                </a>
              )}

              {selectedStaff.facebookUrl && (
                <a
                  href={selectedStaff.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem",
                    fontSize: "0.85rem",
                    textDecoration: "none"
                  }}
                >
                  <Facebook style={{ width: "16px", height: "16px", color: "#1877F2", flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontSize: "0.65rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      marginBottom: "0.25rem"
                    }}>
                      Facebook
                    </div>
                    <div style={{
                      fontSize: "0.9rem",
                      color: "var(--text)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      Xem trang cá nhân
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Staff;
