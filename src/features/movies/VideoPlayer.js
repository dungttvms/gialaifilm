import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import posterImg from "../../images/Logo.png";
import logoMovie from "../../images/movieLogo.png";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideControlsTimeout = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const url = new URLSearchParams(location.search).get("url");

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = videoElement.currentTime;
      localStorage.setItem(`watchTime-${url}`, currentTime);
    };

    const handleLoad = () => {
      const savedTime = parseFloat(localStorage.getItem(`watchTime-${url}`));
      if (savedTime > 0) {
        const userWantsToResume = window.confirm(
          `Bạn đã xem đến phút ${Math.floor(
            savedTime / 60
          )}. Bạn có muốn tiếp tục từ đây không?`
        );
        if (userWantsToResume) {
          videoElement.currentTime = savedTime;
        }
      }
    };

    const setupHls = () => {
      let hls;
      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferSize: 60 * 1000 * 1000,
          maxBufferAhead: 30 * 1000,
        });

        hls.loadSource(url);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS.js error", data);
          if (data.fatal === Hls.ErrorTypes.NETWORK_ERROR) {
            setError(true);
          }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play().catch((error) => {
            console.error("Error playing video", error);
          });
        });
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = url;
        videoElement.addEventListener("timeupdate", handleTimeUpdate);
        videoElement.addEventListener("loadedmetadata", handleLoad);
      } else {
        setError(true);
      }

      return hls;
    };

    const hls = setupHls();

    // Handle Fullscreen changes
    const handleFullscreenChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!fsElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("loadedmetadata", handleLoad);
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, [url]);

  useEffect(() => {
    const handleMouseMove = () => {
      setControlsVisible(true);

      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }

      hideControlsTimeout.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2500);
    };

    const handleMouseLeave = () => {
      setControlsVisible(false);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", position: "relative" }}
    >
      <Card
        sx={{ maxWidth: "1024px", width: "100%", position: "relative" }}
        ref={containerRef}
      >
        <CardContent
          sx={{ p: 0, m: 0, backgroundColor: "black", position: "relative" }}
        >
          {error ? (
            <>
              <Typography
                color="error"
                variant="h6"
                sx={{ fontFamily: "Montserrat, sans-serif", padding: 2 }}
              >
                Bộ phim hiện không khả dụng
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setError(false);
                  window.location.reload();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 auto",
                  fontFamily: "Montserrat, sans-serif",
                  padding: "8px 16px",
                }}
              >
                Thử lại
              </Button>
            </>
          ) : (
            <Box sx={{ position: "relative", width: "100%" }}>
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                poster={posterImg}
                style={{ width: "100%", height: "auto" }}
                controlsList="nofullscreen"
              />
              {/* Logo Overlay */}
              <img
                src={logoMovie}
                alt="Logo"
                style={{
                  position: "absolute",
                  top: isMobile ? "10px" : isFullscreen ? "64px" : "35px",
                  left: isMobile ? "10px" : isFullscreen ? "68px" : "50px",
                  width: isMobile ? "50px" : isFullscreen ? "300px" : "200px",
                  zIndex: 10,
                  pointerEvents: "none",
                  transition: "width 0.3s, top 0.3s, left 0.3s",
                }}
              />
              {/* Fullscreen Toggle Button */}
              {!isMobile && (
                <IconButton
                  onClick={toggleFullscreen}
                  sx={{
                    position: "absolute",
                    bottom: isFullscreen ? "43px" : "35px",
                    right: isFullscreen ? "94px" : "48px",
                    zIndex: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    opacity: controlsVisible ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoPlayer;
