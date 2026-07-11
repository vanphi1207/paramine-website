import React, { useState, useEffect } from "react";
import { Menu, X, Box, User, LogOut } from "lucide-react";
import { PageView } from "../types";
import { VOTE_LINK } from "../constants";
import { AccountView } from "../lib/api.ts";

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  onNavigateSection: (sectionId: string) => void;
  account?: AccountView | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  onNavigateSection,
  account,
  onOpenAuth,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (target: string, isPage: boolean) => {
    setIsOpen(false);
    if (isPage) {
      if (target === "home") {
        setCurrentPage("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (target === "wiki") {
        setCurrentPage("wiki");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (currentPage !== "home") {
        setCurrentPage("home");
        setTimeout(() => onNavigateSection(target), 100);
      } else {
        onNavigateSection(target);
      }
    }
  };

  return (
    <header className="navbar" style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "var(--nav-bg)",
      fontFamily: "var(--pixel)",
      height: "64px"
    }}>
      <div className="navbar-inner" style={{
        maxWidth: "1180px",
        margin: "0 auto",
        padding: "0 2rem",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <a 
          className="navbar__brand"
          onClick={() => handleNavClick("home", true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}
        >
          <span style={{
            width: "28px",
            height: "28px",
            flex: "0 0 auto",
            background: "linear-gradient(180deg, var(--sandstone) 0 34%, var(--sandstone-dark) 34% 68%, var(--dirt) 68% 100%)",
            imageRendering: "pixelated",
            boxShadow: "0 0 0 2px var(--panel-dark)"
          }}></span>
          <span style={{
            color: "var(--nav-text)",
            fontWeight: "800",
            letterSpacing: "1.5px",
            textShadow: "2px 2px 0 rgba(0, 0, 0, 0.35)",
            textTransform: "uppercase",
            fontSize: "0.95rem"
          }}>
            Paramine
          </span>
        </a>

        <nav className="navbar__items" style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <button
            onClick={() => handleNavClick("home", true)}
            style={{
              fontSize: "0.85rem",
              fontWeight: "700",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "var(--nav-text)",
              padding: "6px 12px",
              margin: "0 2px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "0",
              transition: "all 0.15s",
              borderBottom: currentPage === "home" ? "3px solid var(--grass)" : "3px solid transparent"
            }}
          >
            Trang chủ
          </button>
          <button
            onClick={() => handleNavClick("features", false)}
            style={{
              fontSize: "0.85rem",
              fontWeight: "700",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "var(--nav-text-dim)",
              padding: "6px 12px",
              margin: "0 2px",
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              borderRadius: "0",
              transition: "all 0.15s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--nav-text)";
              e.currentTarget.style.border = "1px solid var(--panel-dark)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--nav-text-dim)";
              e.currentTarget.style.border = "1px solid transparent";
            }}
          >
            Tính năng
          </button>
          <button
            onClick={() => handleNavClick("staff", false)}
            style={{
              fontSize: "0.85rem",
              fontWeight: "700",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "var(--nav-text-dim)",
              padding: "6px 12px",
              margin: "0 2px",
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              borderRadius: "0",
              transition: "all 0.15s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--nav-text)";
              e.currentTarget.style.border = "1px solid var(--panel-dark)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--nav-text-dim)";
              e.currentTarget.style.border = "1px solid transparent";
            }}
          >
            Đội ngũ
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "1rem" }}>
          <button
            onClick={() => handleNavClick("wiki", true)}
            className="btn btn-primary"
            style={{ fontSize: "0.85rem" }}
          >
            Wiki
          </button>
          {account ? (
            <span style={{
              color: "var(--nav-text-dim)",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px"
            }}>
              {account.username}
              <button
                onClick={onLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--nav-text-dim)",
                  cursor: "pointer",
                  fontSize: "0.75rem"
                }}
              >
                ✕
              </button>
            </span>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn btn-secondary"
              style={{ fontSize: "0.85rem" }}
            >
              Đăng nhập
            </button>
          )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
