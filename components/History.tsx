import React from "react";
import { HISTORY_EVENTS } from "../constants";
import Reveal from "./Reveal";

const History: React.FC = () => {
  return (
    <section id="history" style={{ padding: "4rem 2rem", overflow: "hidden" }}>
      <div style={{ maxWidth: "840px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{
              fontFamily: "var(--pixel)",
              fontSize: "1.75rem",
              fontWeight: "800",
              letterSpacing: "1px",
              color: "var(--text)",
              margin: "0"
            }}>
              Hành Trình Phát Triển
            </h2>
          </div>
        </Reveal>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            left: "24px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "var(--panel-dark)"
          }}></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {HISTORY_EVENTS.map((event, index) => {
              const Icon = event.icon || (() => null);

              return (
                <Reveal key={index} delay={index * 100}>
                  <div style={{
                    position: "relative",
                    paddingLeft: "56px"
                  }}>
                    <div style={{
                      position: "absolute",
                      left: "12px",
                      top: 0,
                      width: "24px",
                      height: "24px",
                      background: "var(--bg)",
                      border: "3px solid var(--nav-accent)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10
                    }}>
                      <div style={{
                        width: "8px",
                        height: "8px",
                        background: "white",
                        borderRadius: "50%"
                      }}></div>
                    </div>

                    <div className="panel" style={{
                      padding: "1.5rem"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "0.75rem"
                      }}>
                        <Icon style={{ width: "16px", height: "16px", color: "var(--nav-accent)" }} />
                        <span style={{
                          color: "var(--nav-accent)",
                          fontFamily: "var(--mono)",
                          fontSize: "0.85rem",
                          fontWeight: "700",
                          letterSpacing: "0.5px"
                        }}>
                          {event.year}
                        </span>
                      </div>
                      <h3 style={{
                        fontFamily: "var(--pixel)",
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        color: "var(--text)",
                        margin: "0 0 0.5rem"
                      }}>
                        {event.title}
                      </h3>
                      <p style={{
                        color: "var(--text-dim)",
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                        margin: "0"
                      }}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
