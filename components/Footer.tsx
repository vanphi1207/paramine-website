import React from "react";
import { Box, Facebook, Mail, Heart } from "lucide-react";
import { DISCORD_LINK, VOTE_LINK, FACEBOOK_LINK } from "../constants";

const Footer: React.FC = () => {
  return (
    <footer
      className="site-footer"
      style={{
        padding: "3rem 2rem 2rem",
        textAlign: "center",
        color: "var(--text-dim)",
        fontSize: "12.5px",
        fontFamily: "var(--mono)",
        background: "var(--bg-alt)",
        borderTop: "2px solid var(--panel-dark)",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Discord
          </a>
          <a
            href={FACEBOOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Facebook
          </a>
          <a
            href={VOTE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Vote
          </a>
        </div>
        <p>© 2026 Paramine — Máy chủ Minecraft hàng đầu Việt Nam</p>
        <p style={{ marginTop: "0.5rem" }}>Made with ❤️ by ihqqq.</p>
      </div>
    </footer>
  );
};

export default Footer;
