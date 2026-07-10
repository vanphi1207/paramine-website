import React, { useEffect, useMemo, useState } from "react";
import { GALLERY_IMAGES, GALLERY_PERIODS } from "../constants";
import { GalleryImage } from "../types";
import Reveal from "./Reveal";
import {
  X,
  ZoomIn,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

const ALL_PERIOD_ID = "all";

const Gallery: React.FC = () => {
  const featuredImages = useMemo(
    () => GALLERY_IMAGES.filter((img) => img.featured).slice(0, 6),
    [],
  );

  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(ALL_PERIOD_ID);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    if (selectedPeriod === ALL_PERIOD_ID) return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.periodId === selectedPeriod);
  }, [selectedPeriod]);

  const currentIndexInFiltered = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const goToImage = (direction: 1 | -1) => {
    if (currentIndexInFiltered === -1) return;
    const nextIndex =
      (currentIndexInFiltered + direction + filteredImages.length) %
      filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "Escape") setSelectedImage(null);
        if (e.key === "ArrowRight") goToImage(1);
        if (e.key === "ArrowLeft") goToImage(-1);
      } else if (isExplorerOpen && e.key === "Escape") {
        setIsExplorerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, isExplorerOpen, currentIndexInFiltered, filteredImages]);

  useEffect(() => {
    document.body.style.overflow =
      isExplorerOpen || selectedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExplorerOpen, selectedImage]);

  const periodLabel = (periodId: string) =>
    GALLERY_PERIODS.find((p) => p.id === periodId)?.label ?? "";

  const openExplorer = (periodId: string = ALL_PERIOD_ID) => {
    setSelectedPeriod(periodId);
    setIsExplorerOpen(true);
  };

  return (
    <section id="gallery" style={{ padding: "4rem 2rem" }}>
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
              Thư Viện Ảnh
            </h2>
            <p style={{ color: "var(--text-dim)", margin: "0.5rem 0 0" }}>
              Những khoảnh khắc đáng nhớ tại Paramine.
            </p>
          </div>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {featuredImages.map((image, index) => (
            <Reveal key={image.id} delay={index * 100}>
              <div
                className="panel"
                style={{
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: "1",
                  position: "relative",
                  transition: "all 0.15s"
                }}
                onClick={() => {
                  setSelectedPeriod(ALL_PERIOD_ID);
                  setSelectedImage(image);
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s"
                  }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.5rem",
                  color: "white"
                }}>
                  <span style={{
                    fontSize: "0.7rem",
                    fontFamily: "var(--mono)",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: "var(--nav-accent)",
                    marginBottom: "0.5rem"
                  }}>
                    🕐 {periodLabel(image.periodId)}
                  </span>
                  <h3 style={{
                    fontFamily: "var(--pixel)",
                    fontSize: "0.95rem",
                    fontWeight: "700",
                    margin: "0 0 0.25rem"
                  }}>
                    {image.title}
                  </h3>
                  <p style={{
                    fontSize: "0.8rem",
                    color: "var(--text-dim)",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}>
                    {image.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={featuredImages.length * 100}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => openExplorer(ALL_PERIOD_ID)}
              className="btn btn-secondary"
              style={{
                gap: "0.5rem"
              }}
            >
              <LayoutGrid style={{ width: "16px", height: "16px" }} />
              Xem toàn bộ thư viện
            </button>
          </div>
        </Reveal>
      </div>

      {isExplorerOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "2rem",
          overflowY: "auto",
          cursor: "pointer"
        }}
        onClick={() => setIsExplorerOpen(false)}
        >
          <div className="panel" style={{
            position: "relative",
            width: "100%",
            maxWidth: "1280px",
            marginTop: "2rem",
            marginBottom: "2rem",
            cursor: "auto",
            display: "flex",
            flexDirection: "column"
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: "1.5rem",
              borderBottom: "2px solid var(--panel-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem"
            }}>
              <div>
                <h3 style={{
                  fontFamily: "var(--pixel)",
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  color: "var(--text)",
                  margin: "0 0 0.25rem"
                }}>
                  Thư Viện Đầy Đủ
                </h3>
                <p style={{
                  fontSize: "0.85rem",
                  color: "var(--text-dim)",
                  margin: 0
                }}>
                  Chọn mốc thời gian để xem lại hành trình của Paramine
                </p>
              </div>
              <button
                onClick={() => setIsExplorerOpen(false)}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--button-bg)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-dim)",
                  boxShadow: "inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)",
                  flexShrink: 0
                }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <div style={{
              padding: "1.5rem",
              borderBottom: "2px solid var(--panel-dark)",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem"
            }}>
              <button
                onClick={() => setSelectedPeriod(ALL_PERIOD_ID)}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  fontFamily: "var(--pixel)",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  background: selectedPeriod === ALL_PERIOD_ID ? "var(--nav-accent)" : "var(--button-bg)",
                  color: selectedPeriod === ALL_PERIOD_ID ? "white" : "var(--text)",
                  boxShadow: selectedPeriod === ALL_PERIOD_ID ? "0 4px 0 #0b4d2c" : "inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)",
                  transition: "all 0.1s"
                }}
              >
                Tất cả ({GALLERY_IMAGES.length})
              </button>
              {GALLERY_PERIODS.map((period) => {
                const count = GALLERY_IMAGES.filter(
                  (img) => img.periodId === period.id,
                ).length;
                return (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.85rem",
                      fontFamily: "var(--pixel)",
                      fontWeight: "700",
                      border: "none",
                      cursor: "pointer",
                      background: selectedPeriod === period.id ? "var(--nav-accent)" : "var(--button-bg)",
                      color: selectedPeriod === period.id ? "white" : "var(--text)",
                      boxShadow: selectedPeriod === period.id ? "0 4px 0 #0b4d2c" : "inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)",
                      transition: "all 0.1s"
                    }}
                  >
                    {period.label} ({count})
                  </button>
                );
              })}
            </div>

            <div style={{
              padding: "1.5rem",
              flex: 1
            }}>
              {filteredImages.length === 0 ? (
                <div style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  color: "var(--text-dim)"
                }}>
                  Chưa có ảnh nào cho mốc thời gian này.
                </div>
              ) : (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "1rem"
                }}>
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className="panel"
                      style={{
                        overflow: "hidden",
                        cursor: "pointer",
                        aspectRatio: "1",
                        transition: "all 0.15s"
                      }}
                      onClick={() => setSelectedImage(image)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 110,
          background: "rgba(0, 0, 0, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          cursor: "pointer"
        }}
        onClick={() => setSelectedImage(null)}
        >
          <button
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              width: "40px",
              height: "40px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text)",
              zIndex: 10
            }}
            onClick={() => setSelectedImage(null)}
          >
            <X style={{ width: "24px", height: "24px" }} />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text)",
                  zIndex: 10
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(-1);
                }}
              >
                <ChevronLeft style={{ width: "24px", height: "24px" }} />
              </button>
              <button
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text)",
                  zIndex: 10
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(1);
                }}
              >
                <ChevronRight style={{ width: "24px", height: "24px" }} />
              </button>
            </>
          )}

          <div style={{
            position: "relative",
            maxWidth: "1280px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "hidden",
            cursor: "auto"
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                maxHeight: "85vh",
                background: "var(--bg)"
              }}
            />
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.6)",
              padding: "1.5rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.75rem",
                fontFamily: "var(--mono)",
                fontWeight: "700",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: "var(--nav-accent)"
              }}>
                🕐 {periodLabel(selectedImage.periodId)}
              </span>
              <h3 style={{
                fontFamily: "var(--pixel)",
                fontSize: "1.3rem",
                fontWeight: "800",
                color: "white",
                margin: "0.5rem 0 0"
              }}>
                {selectedImage.title}
              </h3>
              <p style={{
                color: "var(--text-dim)",
                margin: "0.5rem 0 0"
              }}>
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
