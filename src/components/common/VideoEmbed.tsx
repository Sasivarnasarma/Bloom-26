import { useEffect, useRef, useState } from "react";
import type { VideoItem } from "../../types/content";
import { getVideoEmbedUrl } from "../../utils/links";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { cn } from "../../utils/cn";
import Player from "@vimeo/player";

interface VideoEmbedProps {
  video: VideoItem;
}

export function VideoEmbed({ video }: VideoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);

  const [embedUrl, setEmbedUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Compute the embed URL on mount
  useEffect(() => {
    const cleanUrl = getVideoEmbedUrl(video.url);
    const apiQuery = `?controls=0&api=1&player_id=vimeo-player&background=0`;
    setEmbedUrl(`${cleanUrl}${apiQuery}`);
  }, [video.url]);

  // Initialize Vimeo Player SDK
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Create the Vimeo SDK Player instance
    const player = new Player(iframe);
    playerRef.current = player;

    // Listen to playback events using SDK listeners
    player.on("play", () => {
      setIsPlaying(true);
    });

    player.on("pause", () => {
      setIsPlaying(false);
    });

    player.on("timeupdate", (data) => {
      setCurrentTime(data.seconds);
      if (data.duration) {
        setDuration(data.duration);
      }
    });

    // Get initial duration once loaded
    player
      .getDuration()
      .then((d) => {
        setDuration(d);
      })
      .catch(() => {});

    // Get initial muted state
    player
      .getVolume()
      .then((volume) => {
        setIsMuted(volume === 0);
      })
      .catch(() => {});

    return () => {
      player.destroy();
      playerRef.current = null;
    };
  }, [embedUrl]);

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleMuteToggle = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isMuted) {
      player.setVolume(1).then(() => {
        setIsMuted(false);
      });
    } else {
      player.setVolume(0).then(() => {
        setIsMuted(true);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    playerRef.current?.setCurrentTime(time);
  };

  const handleFullscreenToggle = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Fullscreen error:", err);
        });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Controls auto-hide behavior on mouse inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  useEffect(() => {
    if (isPlaying) {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    }

    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Helper to format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative overflow-hidden rounded-4xl bg-bloom-ink shadow-[0_30px_90px_rgba(25,33,31,0.22)] aspect-video w-full group select-none animate-fadeIn"
    >
      {/* Vimeo Iframe */}
      {embedUrl && (
        <iframe
          ref={iframeRef}
          className="h-full w-full pointer-events-none"
          src={embedUrl}
          title={video.title}
          allow="autoplay; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}

      {/* Invisible overlay for playing/pausing by clicking on the video body */}
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={handlePlayPause} />

      {/* Centered Large Play Button (Fades out when playing, unless controls are shown) */}
      <div
        className={cn(
          "absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-300",
          !isPlaying || showControls ? "opacity-100 scale-100" : "opacity-0 scale-90",
        )}
      >
        <button
          type="button"
          onClick={handlePlayPause}
          className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-bloom-gold text-bloom-ink shadow-lg transition duration-300 hover:scale-110 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-8 fill-current" />
          ) : (
            <Play className="size-8 fill-current translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Bottom Control Bar */}
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 z-30 p-6 bg-linear-to-t from-black/85 via-black/40 to-transparent transition-all duration-300 flex flex-col gap-4",
          showControls || !isPlaying
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        {/* Timeline Slider */}
        <div className="flex items-center gap-3 w-full pointer-events-auto">
          <span className="font-display text-xs font-bold text-white/90">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-bloom-gold h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <span className="font-display text-xs font-bold text-white/90">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between w-full pointer-events-auto">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={handlePlayPause}
              className="text-white hover:text-bloom-gold transition"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
            </button>

            {/* Mute/Volume Button */}
            <button
              type="button"
              onClick={handleMuteToggle}
              className="text-white hover:text-bloom-gold transition"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={handleFullscreenToggle}
            className="text-white hover:text-bloom-gold transition"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
