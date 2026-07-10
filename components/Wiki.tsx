import React, { useState, useMemo } from "react";
import { Search, ChevronRight, Menu, BookOpen } from "lucide-react";
import { WIKI_DATA } from "../constants";
import { WikiCategory, WikiSection } from "../types";

const Wiki: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(WIKI_DATA[0].id);
  const [activeSection, setActiveSection] = useState<string>(
    WIKI_DATA[0].sections[0].id,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchQuery) return WIKI_DATA;
    return WIKI_DATA.map((cat) => ({
      ...cat,
      sections: cat.sections.filter(
        (sec) =>
          sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    })).filter((cat) => cat.sections.length > 0);
  }, [searchQuery]);

  const currentContent = useMemo(() => {
    for (const cat of WIKI_DATA) {
      const section = cat.sections.find((s) => s.id === activeSection);
      if (section) return section;
    }
    return null;
  }, [activeSection]);

  const handleSectionClick = (catId: string, secId: string) => {
    setActiveCategory(catId);
    setActiveSection(secId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      paddingTop: "4rem",
      paddingBottom: "3rem",
      paddingLeft: "2rem",
      paddingRight: "2rem",
      maxWidth: "1180px",
      margin: "0 auto"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "2rem"
      }}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            background: "var(--button-bg)",
            border: "none",
            cursor: "pointer",
            color: "white",
            fontFamily: "var(--pixel)",
            fontWeight: "700",
            width: "100%"
          }}
        >
          <Menu style={{ width: "20px", height: "20px" }} />
          {mobileMenuOpen ? "Đóng Menu" : "Mục Lục Wiki"}
        </button>

        <aside style={{
          position: "sticky",
          top: "96px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            <div style={{
              position: "relative"
            }}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 2.5rem 0.75rem 1rem",
                  background: "var(--panel)",
                  border: "2px solid var(--panel-dark)",
                  color: "var(--text)",
                  fontFamily: "var(--mono)",
                  boxShadow: "inset 2px 2px 0 var(--border-light), inset -3px -3px 0 var(--panel-shade)",
                  fontSize: "0.9rem"
                }}
              />
              <Search style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "var(--text-dim)",
                pointerEvents: "none"
              }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {filteredData.map((category) => (
                <div
                  key={category.id}
                  className="panel"
                  style={{ overflow: "hidden" }}
                >
                  <div style={{
                    padding: "0.75rem 1rem",
                    background: "var(--panel-light)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "var(--nav-accent)",
                    fontFamily: "var(--pixel)",
                    fontWeight: "700",
                    fontSize: "0.75rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "1px solid var(--panel-dark)"
                  }}>
                    <category.icon style={{ width: "16px", height: "16px" }} />
                    {category.title}
                  </div>
                  <div>
                    {category.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() =>
                          handleSectionClick(category.id, section.id)
                        }
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "0.75rem 1rem",
                          fontSize: "0.85rem",
                          background: activeSection === section.id ? "var(--panel-light)" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: activeSection === section.id ? "var(--nav-accent)" : "var(--text-dim)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "all 0.1s",
                          borderLeft: activeSection === section.id ? `3px solid var(--nav-accent)` : "3px solid transparent",
                          fontFamily: "var(--mono)"
                        }}
                        onMouseEnter={(e) => {
                          if (activeSection !== section.id) {
                            e.currentTarget.style.background = "var(--panel-dark)";
                            e.currentTarget.style.color = "var(--text)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeSection !== section.id) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "var(--text-dim)";
                          }
                        }}
                      >
                        {section.title}
                        {activeSection === section.id && (
                          <ChevronRight style={{ width: "16px", height: "16px" }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {filteredData.length === 0 && (
                <div style={{
                  textAlign: "center",
                  color: "var(--text-dim)",
                  padding: "2rem 1rem"
                }}>
                  Không tìm thấy kết quả.
                </div>
              )}
            </div>
          </div>
        </aside>

        <main style={{ minWidth: 0 }}>
          <div className="panel" style={{
            padding: "2.5rem",
            minHeight: "600px",
            display: "flex",
            flexDirection: "column"
          }}>
            {currentContent ? (
              <div>
                <div style={{
                  borderBottom: "2px solid var(--panel-dark)",
                  paddingBottom: "1.5rem",
                  marginBottom: "2rem"
                }}>
                  <h1 style={{
                    fontFamily: "var(--pixel)",
                    fontSize: "2rem",
                    fontWeight: "800",
                    letterSpacing: "1px",
                    color: "var(--text)",
                    margin: "0 0 0.5rem"
                  }}>
                    {currentContent.title}
                  </h1>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--text-dim)",
                    fontSize: "0.85rem",
                    fontFamily: "var(--mono)"
                  }}>
                    <span>Wiki</span>
                    <ChevronRight style={{ width: "16px", height: "16px" }} />
                    <span>
                      {WIKI_DATA.find((c) => c.id === activeCategory)?.title}
                    </span>
                  </div>
                </div>
                <div style={{
                  color: "var(--text-dim)",
                  lineHeight: "1.7",
                  fontSize: "1rem"
                }}>
                  {currentContent.content}
                </div>
              </div>
            ) : (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "var(--text-dim)"
              }}>
                <BookOpen style={{ width: "64px", height: "64px", marginBottom: "1rem", opacity: 0.3 }} />
                <p>Chọn một mục để xem chi tiết</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wiki;
