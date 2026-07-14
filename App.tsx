import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Staff from "./components/Staff";
import History from "./components/History";
import Gallery from "./components/Gallery";
import Wiki from "./components/Wiki";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import BackgroundMusic from "./components/BackgroundMusic";
import AuthModal from "./components/Auth/AuthModal";
import AdminDashboard from "./components/Admin/AdminDashboard.tsx";
import { useAuth } from "./components/Auth/useAuth";
import { ArrowUp } from "lucide-react";
import { PageView } from "./types";
import { isAdminAccount } from "./lib/api";

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { account, login, register, logout } = useAuth();
  const canAccessAdmin = isAdminAccount(account);

  // Không cho phép ở lại trang admin nếu tài khoản không có quyền (hoặc đăng xuất giữa chừng)
  useEffect(() => {
    if (currentPage === "admin" && !canAccessAdmin) {
      setCurrentPage("home");
    }
  }, [currentPage, canAccessAdmin]);

  const navigateSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        fontFamily: "var(--sans)",
      }}
    >
      <BackgroundMusic />

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onNavigateSection={navigateSection}
        account={account}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={logout}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
        onRegister={register}
      />

      {currentPage === "home" && (
        <main>
          <Hero />
          <Features />
          <div style={{ background: "transparent" }}>
            <Staff />
          </div>
          <Gallery />
          <History />

          <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <Reveal>
              <div
                className="panel"
                style={{
                  maxWidth: "1180px",
                  margin: "0 auto",
                  padding: "2.5rem 2rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--pixel)",
                    fontSize: "1.6rem",
                    letterSpacing: "1px",
                    fontWeight: "800",
                    color: "var(--text)",
                    margin: "0 0 1.25rem 0",
                  }}
                >
                  Sẵn sàng tham chiến?
                </h2>
                <p
                  style={{
                    color: "var(--text-dim)",
                    maxWidth: "48ch",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  Hàng ngàn người chơi đang chờ đợi bạn tại Paramine. Đừng bỏ lỡ
                  cơ hội trải nghiệm máy chủ Minecraft tuyệt vời nhất.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("paramine.fun");
                    }}
                    className="btn btn-primary"
                  >
                    Tham Gia Ngay
                  </button>
                </div>
              </div>
            </Reveal>
          </section>
        </main>
      )}

      {currentPage === "wiki" && <Wiki />}

      {currentPage === "admin" && account && canAccessAdmin && (
        <AdminDashboard
          account={account}
          onBack={() => setCurrentPage("home")}
        />
      )}

      <Footer />

      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          background: "var(--grass)",
          color: "white",
          width: "48px",
          height: "48px",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          boxShadow: `
            inset 2px 2px 0 var(--button-highlight),
            inset -3px -3px 0 var(--button-shade),
            0 8px 0 #0b4d2c,
            0 10px 14px rgba(0, 0, 0, 0.28)
          `,
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.3s ease",
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
      >
        <ArrowUp style={{ width: "24px", height: "24px" }} />
      </button>
    </div>
  );
}

export default App;
