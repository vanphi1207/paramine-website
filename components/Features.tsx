import React, { useEffect, useState } from "react";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
import { FEATURES } from "../constants";
import { Feature } from "../types";
import Reveal from "./Reveal";

const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  // Đóng modal bằng phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedFeature(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Khóa scroll nền khi modal đang mở
  useEffect(() => {
    document.body.style.overflow = selectedFeature ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedFeature]);

  return (
    <section id="features" style={{ padding: "4rem 2rem", background: "transparent" }}>
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
              Tính Năng Nổi Bật
            </h2>
            <p style={{ color: "var(--text-dim)", maxWidth: "50ch", margin: "1rem auto 0", lineHeight: "1.6" }}>
              Paramine mang đến trải nghiệm Minecraft độc đáo với những tính
              năng được tùy chỉnh riêng biệt. Bấm vào từng thẻ để xem chi tiết.
            </p>
          </div>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}>
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={index} delay={index * 150}>
                <button
                  type="button"
                  onClick={() => setSelectedFeature(feature)}
                  className="panel"
                  style={{
                    padding: "1.5rem",
                    textAlign: "left",
                    background: "var(--panel)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    transition: "all 0.15s",
                    minHeight: "280px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--panel-light)";
                    e.currentTarget.style.boxShadow = `
                      inset 2px 2px 0 var(--border-light),
                      inset -3px -3px 0 var(--panel-shade),
                      0 4px 0 var(--panel-dark)
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--panel)";
                    e.currentTarget.style.boxShadow = `
                      inset 2px 2px 0 var(--border-light),
                      inset -3px -3px 0 var(--panel-shade)
                    `;
                  }}
                >
                  <div style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--button-bg)",
                    boxShadow: "inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)"
                  }}>
                    <Icon style={{ width: "24px", height: "24px", color: "var(--text)" }} />
                  </div>
                  <h3 style={{
                    fontFamily: "var(--pixel)",
                    fontSize: "1rem",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    color: "var(--text)",
                    margin: "0"
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: "var(--text-dim)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    margin: "0",
                    flex: 1
                  }}>
                    {feature.description}
                  </p>
                  <span style={{
                    color: "var(--nav-accent)",
                    fontSize: "0.75rem",
                    fontFamily: "var(--pixel)",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase"
                  }}>
                    Xem chi tiết →
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {selectedFeature && (
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
            onClick={() => setSelectedFeature(null)}
          />

          <div className="panel" style={{
            position: "relative",
            width: "100%",
            maxWidth: "520px",
            padding: "2rem",
            maxHeight: "85vh",
            overflowY: "auto"
          }}>
            <button
              onClick={() => setSelectedFeature(null)}
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

            <div style={{
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--button-bg)",
              boxShadow: "inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)",
              marginBottom: "1.5rem"
            }}>
              <selectedFeature.icon style={{ width: "32px", height: "32px", color: "var(--text)" }} />
            </div>

            <h3 style={{
              fontFamily: "var(--pixel)",
              fontSize: "1.4rem",
              fontWeight: "800",
              letterSpacing: "0.5px",
              color: "var(--text)",
              margin: "0 0 1rem 0"
            }}>
              {selectedFeature.title}
            </h3>

            <p style={{
              color: "var(--text-dim)",
              lineHeight: "1.6",
              marginBottom: "1.5rem"
            }}>
              {selectedFeature.details ?? selectedFeature.description}
            </p>

            {selectedFeature.highlights &&
              selectedFeature.highlights.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{
                    fontFamily: "var(--pixel)",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: "var(--nav-accent)",
                    marginBottom: "0.75rem"
                  }}>
                    ✨ Điểm nổi bật
                  </h4>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", margin: 0, padding: 0, listStyle: "none" }}>
                    {selectedFeature.highlights.map((point, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          fontSize: "0.9rem",
                          color: "var(--text-dim)"
                        }}
                      >
                        <span style={{
                          width: "6px",
                          height: "6px",
                          background: "var(--nav-accent)",
                          borderRadius: "50%",
                          marginTop: "0.6em",
                          flexShrink: 0
                        }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {selectedFeature.stats && selectedFeature.stats.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.75rem"
              }}>
                {selectedFeature.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="panel"
                    style={{
                      padding: "1rem",
                      textAlign: "center"
                    }}
                  >
                    <div style={{
                      fontFamily: "var(--pixel)",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      color: "var(--nav-accent)",
                      marginBottom: "0.25rem"
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: "0.7rem",
                      fontFamily: "var(--mono)",
                      color: "var(--text-dim)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase"
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;
