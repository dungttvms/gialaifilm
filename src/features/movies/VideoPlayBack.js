import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const VideoPlayback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const url = new URLSearchParams(location.search).get("url");

  const savedEpisodes = localStorage.getItem("episodes");
  const episodes = useMemo(
    () => (savedEpisodes ? JSON.parse(savedEpisodes) : []),
    [savedEpisodes]
  );

  const totalEpisodes = episodes.reduce(
    (count, episode) => count + episode.server_data.length,
    0
  );
  const rangeSize = 100;

  const [currentEpisode_m3u8, setCurrentEpisode_m3u8] = useState("");
  const [currentEpisode_embed, setCurrentEpisode_embed] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(
    totalEpisodes < rangeSize ? totalEpisodes : rangeSize
  );
  const [visibleEpisodes, setVisibleEpisodes] = useState([]);

  const getRangeButtons = () => {
    const ranges = [];
    for (let start = 0; start < totalEpisodes; start += rangeSize) {
      const end = Math.min(start + rangeSize, totalEpisodes);
      ranges.push([start, end]);
    }
    return ranges;
  };
  const ranges = getRangeButtons();

  const handleChangedEpisode_m3u8 = useCallback(
    (url) => {
      navigate(`/video/?url=${url}`, url);
    },
    [navigate]
  );

  const handleChangedEpisode_embed = useCallback((embedUrl) => {
    setCurrentEpisode_embed(embedUrl);
    window.open(embedUrl, "_blank");
  }, []);

  const handleRangeChange = (newStart, newEnd) => {
    setStart(newStart);
    setEnd(newEnd);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentEpisode_m3u8(url);
    }, 2000);

    return () => clearTimeout(timer);
  }, [url]);

  useEffect(() => {
    const currentServerData = episodes[0]?.server_data.slice(start, end);
    setVisibleEpisodes(currentServerData);
  }, [start, end, episodes]);

  const checkWatchPosition = (episodeId) => {
    const watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || {};
    return watchHistory[episodeId] || 0;
  };

  const saveWatchPosition = (episodeId, currentTime) => {
    const watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || {};
    watchHistory[episodeId] = currentTime;

    localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
  };

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;

      const episodeId = currentEpisode_m3u8;
      saveWatchPosition(episodeId, currentTime);
    }
  }, [currentEpisode_m3u8]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("pause", handlePause);
      return () => {
        videoElement.removeEventListener("pause", handlePause);
      };
    }
  }, [handlePause]);

  useEffect(() => {
    const episodeId = currentEpisode_m3u8;
    const lastWatchTime = checkWatchPosition(episodeId);

    if (lastWatchTime > 0) {
      const userWantsToResume = window.confirm(
        `Bạn đã xem đến phút ${Math.floor(
          lastWatchTime / 60
        )}. Bạn có muốn tiếp tục từ đây không?`
      );

      if (userWantsToResume) {
        videoRef.current.currentTime = lastWatchTime;
      }
    }
  }, [currentEpisode_m3u8]);

  return (
    <Container style={{ backgroundColor: "#000", padding: "20px" }}>
      <CardMedia
        sx={{
          height: "76vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "10px",
          marginBottom: {
            xs: "10px",
            sm: "30px",
          },
        }}
      >
        {currentEpisode_m3u8 ? (
          <VideoPlayer ref={videoRef} url={currentEpisode_m3u8} />
        ) : (
          <p style={{ color: "white", fontFamily: "Montserrat, sans-serif" }}>
            No video URL selected
          </p>
        )}
      </CardMedia>

      <Box sx={{ marginTop: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              display="flex"
              justifyContent="left"
              sx={{
                color: "white",
                my: 1,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Server Phim Gia Lai (Khuyến nghị)
            </Typography>
            <Typography
              display="flex"
              justifyContent="left"
              sx={{
                color: "red",
                my: 1,
                fontSize: "small",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Vui lòng tải lại trình duyệt nếu video bị lỗi
            </Typography>

            {totalEpisodes >= rangeSize && (
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
                padding="10px 0"
                sx={{
                  marginBottom: "20px",
                }}
              >
                {ranges.map(([start, end]) => (
                  <Button
                    key={`${start}-${end}`}
                    variant="outlined"
                    color="success"
                    onClick={() => handleRangeChange(start, end)}
                    sx={{
                      flex: "1 1 calc(20% - 10px)",
                      minWidth: "80px",
                      marginBottom: "10px",
                      mx: "1px",
                    }}
                  >
                    {start + 1}-{end}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ marginTop: "20px" }}>
              <Grid container spacing={1}>
                {visibleEpisodes.map((data, i) => {
                  let displayName;
                  if (
                    data.name === "Full" ||
                    data.name === "Lồng Tiếng" ||
                    data.name === "Full Long Tieng" ||
                    data.name === "Full Thuyết Minh" ||
                    data.name === "Full Vietsub" ||
                    data.name === "Thuyết Minh"
                  ) {
                    displayName = data.name;
                  } else {
                    displayName = `${start + i + 1}`;
                  }
                  const isActive = data.link_m3u8 === currentEpisode_m3u8;

                  return (
                    <Grid item key={i}>
                      <Button
                        variant="outlined"
                        color={isActive ? "success" : "secondary"}
                        sx={{ minWidth: "65px" }}
                        onClick={() => {
                          setCurrentEpisode_m3u8(data.link_m3u8);
                          handleChangedEpisode_m3u8(data.link_m3u8);
                        }}
                      >
                        {displayName}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <Box>
              <Typography
                display="flex"
                justifyContent="left"
                sx={{
                  color: "white",
                  mt: 3,
                  mb: 2,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Server dự phòng
              </Typography>
              <Grid container spacing={1}>
                {visibleEpisodes.map((data, i) => {
                  let displayName;
                  if (
                    data.name === "Full" ||
                    data.name === "Lồng Tiếng" ||
                    data.name === "Full Long Tieng" ||
                    data.name === "Full Thuyết Minh" ||
                    data.name === "Full Vietsub" ||
                    data.name === "Thuyết Minh"
                  ) {
                    displayName = data.name;
                  } else {
                    displayName = `${start + i + 1}`;
                  }
                  const isActive = data.link_embed === currentEpisode_embed;

                  return (
                    <Grid item key={i}>
                      <Button
                        variant="outlined"
                        color={isActive ? "success" : "secondary"}
                        sx={{ minWidth: "65px" }}
                        onClick={() => {
                          setCurrentEpisode_embed(data.link_embed);
                          handleChangedEpisode_embed(data.link_embed);
                        }}
                      >
                        {displayName}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default VideoPlayback;
