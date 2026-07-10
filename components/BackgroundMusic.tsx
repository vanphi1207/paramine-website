import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Music,
  VolumeX,
  Volume2,
  Upload,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
} from "lucide-react";
import { BACKGROUND_MUSIC_PLAYLIST, MusicTrack } from "../constants";

type RepeatMode = "all" | "one" | "off";

const BackgroundMusic: React.FC = () => {
  const [playlist, setPlaylist] = useState<MusicTrack[]>(
    BACKGROUND_MUSIC_PLAYLIST,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Mặc định 30%
  const [isHovered, setIsHovered] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTrack = playlist[currentIndex];

  const goToNext = useCallback(
    (autoAdvance = false) => {
      if (playlist.length === 0) return;

      if (autoAdvance && repeatMode === "one") {
        const audio = audioRef.current;
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        }
        return;
      }

      let nextIndex: number;
      if (shuffle) {
        if (playlist.length === 1) {
          nextIndex = 0;
        } else {
          do {
            nextIndex = Math.floor(Math.random() * playlist.length);
          } while (nextIndex === currentIndex);
        }
      } else {
        nextIndex = currentIndex + 1;
        if (nextIndex >= playlist.length) {
          if (autoAdvance && repeatMode === "off") {
            setIsPlaying(false);
            return;
          }
          nextIndex = 0;
        }
      }
      setCurrentIndex(nextIndex);
    },
    [playlist, currentIndex, shuffle, repeatMode],
  );

  const goToPrev = useCallback(() => {
    if (playlist.length === 0) return;
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = playlist.length - 1;
    setCurrentIndex(prevIndex);
  }, [playlist, currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            console.log(
              "Autoplay bị trình duyệt chặn. Cần thao tác của người dùng.",
            );
            setIsPlaying(false);
          });
      }
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentIndex, currentTrack?.url]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newTracks: MusicTrack[] = Array.from(files).map((file) => ({
        name: file.name.replace(/\.[^/.]+$/, ""),
        url: URL.createObjectURL(file),
      }));

      setPlaylist((prev) => [...prev, ...newTracks]);
      setCurrentIndex(playlist.length);
      setIsPlaying(true);
    }
    e.target.value = "";
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const cycleRepeatMode = () => {
    setRepeatMode((prev) =>
      prev === "all" ? "one" : prev === "one" ? "off" : "all",
    );
  };

  const RepeatIcon = repeatMode === "one" ? Repeat1 : Repeat;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "2rem",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onEnded={() => goToNext(true)}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        multiple
        style={{ display: "none" }}
      />

      <div className="panel" style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        paddingRight: "1rem",
        transition: "all 0.3s ease",
        width: isHovered ? "auto" : "48px",
        overflow: "hidden"
      }}>
        <button
          onClick={togglePlay}
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: isPlaying ? "var(--grass)" : "var(--button-bg)",
            border: "none",
            cursor: "pointer",
            color: isPlaying ? "white" : "var(--text-dim)",
            boxShadow: isPlaying 
              ? `inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade), 0 4px 0 #0b4d2c`
              : `inset 1px 1px 0 var(--button-highlight), inset -2px -2px 0 var(--button-shade)`,
            transition: "all 0.1s"
          }}
          title={isPlaying ? "Tạm dừng" : "Phát"}
        >
          {isPlaying ? (
            <Music style={{ width: "16px", height: "16px" }} />
          ) : (
            <VolumeX style={{ width: "16px", height: "16px" }} />
          )}
        </button>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          overflow: "hidden",
          transition: "all 0.3s ease",
          maxWidth: isHovered ? "420px" : "0",
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? "visible" : "hidden"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "90px",
            maxWidth: "110px",
            gap: "0.2rem"
          }}>
            <span style={{
              fontSize: "0.7rem",
              fontFamily: "var(--pixel)",
              fontWeight: "700",
              color: "var(--nav-accent)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              whiteSpace: "nowrap"
            }}>
              {isPlaying ? "Đang phát" : "Tạm dừng"}
            </span>
            <span style={{
              fontSize: "0.7rem",
              color: "var(--text-dim)",
              fontFamily: "var(--mono)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>
              {currentTrack ? currentTrack.name : "Không có bài hát"}
            </span>
            <span style={{
              fontSize: "0.65rem",
              color: "var(--text-dim)",
              fontFamily: "var(--mono)",
              whiteSpace: "nowrap"
            }}>
              {playlist.length > 0
                ? `Bài ${currentIndex + 1}/${playlist.length}`
                : ""}
            </span>
          </div>

          <div style={{
            height: "32px",
            width: "1px",
            background: "var(--panel-dark)",
            margin: "0 0.25rem"
          }}></div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem"
          }}>
            <button
              onClick={goToPrev}
              style={{
                padding: "0.375rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-dim)",
                transition: "color 0.1s"
              }}
              title="Bài trước"
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--nav-accent)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-dim)"}
            >
              <SkipBack style={{ width: "16px", height: "16px" }} />
            </button>
            <button
              onClick={() => goToNext(false)}
              style={{
                padding: "0.375rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-dim)",
                transition: "color 0.1s"
              }}
              title="Bài tiếp theo"
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--nav-accent)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-dim)"}
            >
              <SkipForward style={{ width: "16px", height: "16px" }} />
            </button>
            <button
              onClick={() => setShuffle((s) => !s)}
              style={{
                padding: "0.375rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: shuffle ? "var(--nav-accent)" : "var(--text-dim)",
                transition: "color 0.1s"
              }}
              title={shuffle ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"}
              onMouseEnter={(e) => !shuffle && (e.currentTarget.style.color = "var(--nav-accent)")}
              onMouseLeave={(e) => !shuffle && (e.currentTarget.style.color = "var(--text-dim)")}
            >
              <Shuffle style={{ width: "16px", height: "16px" }} />
            </button>
            <button
              onClick={cycleRepeatMode}
              style={{
                padding: "0.375rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: repeatMode === "off" ? "var(--text-dim)" : "var(--nav-accent)",
                transition: "color 0.1s"
              }}
              title={
                repeatMode === "all"
                  ? "Lặp toàn bộ playlist (bấm để đổi)"
                  : repeatMode === "one"
                    ? "Lặp lại 1 bài (bấm để đổi)"
                    : "Không lặp (bấm để đổi)"
              }
            >
              <RepeatIcon style={{ width: "16px", height: "16px" }} />
            </button>
          </div>

          <div style={{
            height: "32px",
            width: "1px",
            background: "var(--panel-dark)",
            margin: "0 0.25rem"
          }}></div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <Volume2 style={{
              width: "16px",
              height: "16px",
              color: "var(--text-dim)",
              flexShrink: 0
            }} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: "64px",
                height: "4px",
                background: "var(--button-bg)",
                cursor: "pointer",
                accentColor: "var(--nav-accent)"
              }}
            />
          </div>

          <div style={{
            height: "32px",
            width: "1px",
            background: "var(--panel-dark)",
            margin: "0 0.25rem"
          }}></div>

          <button
            onClick={triggerFileUpload}
            style={{
              padding: "0.375rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-dim)",
              transition: "color 0.1s"
            }}
            title="Thêm nhạc vào playlist"
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--nav-accent)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-dim)"}
          >
            <Upload style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;
