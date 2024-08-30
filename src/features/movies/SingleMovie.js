import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import he from "he";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Avatar,
  Container,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMovie } from "./movieSlice.js";
import LoadingScreen from "../../components/LoadingScreen.js";
import Logo from "../../components/Logo.js";
import NotFoundPage from "../../pages/NotFoundPage.js";

import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  TELEGRAM_URL,
  WHATSAPP_URL,
  X_URL,
} from "../../app/config.js";
import useAuth from "../../hooks/useAuth.js";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#333",
    color: "white",
  },
  media: {
    height: 500,
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "#ffffff",
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#aaa",
  },
  button: {
    width: "100%",
    color: "orange",
  },
  actorAvatar: {
    backgroundColor: "#555555",
    color: "white",
    marginRight: "10px",
  },
  actorName: {
    color: "white",
  },
  keyword: {
    marginRight: "10px",
    marginBottom: "10px",
    color: "white",
  },
  episodesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyItems: "space-around",
    flexWrap: "wrap",
    maxHeight: "200px",
    overflowY: "auto",
    marginTop: "10px",
    marginBottom: "10px",
  },
  episodeButton: {
    marginBottom: "10px",
    color: "white",
    width: "100%",
    position: "relative",
    backgroundColor: "transparent",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0)",
      zIndex: 1,
    },
    "&:hover": {
      color: "white",
      borderRadius: "1px",

      "&::before": {
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        marginBottom: "2px",
      },
    },
  },
  iconButton: {
    fontSize: "24px",
    margin: "0 8px",
    "&:hover": {
      opacity: 1,
    },
  },
  facebookIcon: {
    color: "#3B5998!important",
  },
  linkedInIcon: {
    color: "#0077B5 !important",
  },
  XIcon: {
    color: "#F5F8FA !important",
  },
  telegramIcon: {
    color: "#24A1DE !important",
  },
  whatsAppIcon: {
    color: "#25D366 !important",
  },
  copyIcon: {
    color: "#ffffff !important",
  },
  backgroundBox: {
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      zIndex: 1,
    },
  },
  contentContainer: {
    opacity: 0.8,
    position: "relative",
    zIndex: 2,
  },
});

const ShareIconButton = ({
  label,
  onClick,
  icon: Icon,
  className,
  tooltip,
}) => (
  <Tooltip title={tooltip}>
    <IconButton
      aria-label={`share on ${label}`}
      onClick={onClick}
      className={className}
    >
      <Icon />
    </IconButton>
  </Tooltip>
);

function SingleMovie() {
  const { slug } = useParams();
  const {
    user,
    addMovieToFavoriteList,
    removeMovieFromFavoriteList,
  } = useAuth();
  const classes = useStyles();
  const dispatch = useDispatch();
  const singleMovieData = useSelector((state) => state.movie.singleMovie);
  const singleMovieInfo = singleMovieData.movie;
  const movieId = singleMovieInfo?._id;
  const episodes = singleMovieData.episodes;
  localStorage.setItem("episodes", JSON.stringify(episodes));

  const [firstUrl, setFirstUrl] = useState("");
  const isLoading = useSelector((state) => state.movie.isLoading);
  const error = useSelector((state) => state.movie.error);
  const [shareUrl, setShareUrl] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(getSingleMovie({ slug }));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (episodes?.length > 0) {
      const initialUrl = episodes[0]?.server_data[0]?.link_m3u8;
      setFirstUrl(initialUrl);
      localStorage.setItem("firstUrl", initialUrl);
    }
  }, [episodes]);

  useEffect(() => {
    const storedUrl = localStorage.getItem("firstUrl");
    if (episodes?.length === "undefined") {
      setFirstUrl(storedUrl);
    }
  }, [episodes]);

  useEffect(() => {
    if (singleMovieInfo) {
      const generatedShareUrl = `${window.location.origin}/phim/${singleMovieInfo.slug}`;
      setShareUrl(generatedShareUrl);
    }
  }, [singleMovieInfo]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching single movie:", error);
    }
  }, [error]);

  useEffect(() => {
    const movieIndex = user?.movieFavoriteList.findIndex(
      ({ movie }) => movie._id?.toString() === movieId
    );

    if (movieIndex !== -1) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [user, movieId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!singleMovieInfo) {
    return (
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 15 }} />
        <NotFoundPage />
      </Stack>
    );
  }

  const shareOnSocialMedia = (url) => {
    const fullUrl = `${url}${encodeURIComponent(shareUrl)}`;
    window.open(fullUrl, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        console.log("Copied to clipboard successfully!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleEpisodeClick = () => {
    const url = new URL(window.location.origin + "/video");
    url.searchParams.append("url", firstUrl);
    window.location.href = url.toString();
  };

  const handleClick = (e) => {
    if (!singleMovieInfo.trailer_url) {
      e.preventDefault();
      toast.error("Bộ phim hiện không có trailer");
    }
  };

  const handleFavoriteButton = () => {
    if (!user) {
      toast.error("User is not authenticated.");
      return;
    }

    if (!isAdded) {
      addMovieToFavoriteList({ movieId, singleMovieData })
        .then(() => {})
        .catch((error) => {
          console.error("Error adding movie to favorite list:", error);
          toast.error("Failed to add movie to favorite list.");
        });
    } else {
      removeMovieFromFavoriteList({ movieId })
        .then(() => {})
        .catch((error) => {
          console.error("Error removing movie from favorite list:", error);
          toast.error("Failed to remove movie from favorite list.");
        });
    }
  };
  return (
    <Box
      className={classes.backgroundBox}
      style={{ backgroundImage: `url(${singleMovieInfo.thumb_url})` }}
    >
      <Container className={classes.contentContainer}>
        <Helmet>
          <title>{singleMovieInfo.name} | Phim Gia Lai</title>
          <meta name="description" content={singleMovieInfo.content} />

          <meta
            property="og:title"
            content={`${singleMovieInfo.name} | Phim Gia Lai`}
          />
          <meta property="og:description" content={singleMovieInfo.content} />
          <meta property="og:image" content={singleMovieInfo.poster_url} />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:type" content="video.movie" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${singleMovieInfo.name} | Phim Gia Lai`}
          />
          <meta name="twitter:description" content={singleMovieInfo.content} />
          <meta name="twitter:image" content={singleMovieInfo.thumb_url} />
          {/*   

          <link rel="canonical" href={shareUrl} />

          // {/* //<!-- Additional Meta Tags --> */}
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>

        <Card className={classes.root}>
          <CardContent
            className={classes.content}
            sx={{ backgroundColor: "#333", opacity: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CardMedia
                  className={classes.media}
                  image={singleMovieInfo.poster_url}
                  title={singleMovieInfo.origin_name}
                />
                <Box p={2} alignItems="center">
                  {user ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFavoriteButton}
                        className={classes.button}
                        sx={{ my: 1, fontFamily: "Montserrat, sans-serif" }}
                      >
                        {isAdded
                          ? "XOÁ KHỎI DANH SÁCH YÊU THÍCH"
                          : "THÊM VÀO DANH SÁCH YÊU THÍCH"}
                      </Button>{" "}
                      <Button
                        variant="contained"
                        color="primary"
                        href={singleMovieInfo.trailer_url || "#"}
                        target="_blank"
                        className={classes.button}
                        onClick={handleClick}
                        sx={{ my: 1, fontFamily: "Montserrat, sans-serif" }}
                      >
                        Trailer
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleEpisodeClick()}
                        sx={{ my: 1, fontFamily: "Montserrat, sans-serif" }}
                      >
                        Xem phim
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        href={singleMovieInfo.trailer_url || "#"}
                        target="_blank"
                        className={classes.button}
                        onClick={handleClick}
                        sx={{ my: 1, fontFamily: "Montserrat, sans-serif" }}
                      >
                        Trailer
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleEpisodeClick()}
                        sx={{ my: 1, fontFamily: "Montserrat, sans-serif" }}
                      >
                        Xem phim
                      </Button>
                    </>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography
                  variant="h4"
                  className={classes.title}
                  sx={{
                    pl: 2,
                    pt: 2,
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {singleMovieInfo.name}
                </Typography>

                <Typography
                  variant="h6"
                  className={classes.subtitle}
                  sx={{ pl: 2, pt: 1, fontFamily: "Montserrat, sans-serif" }}
                >
                  {singleMovieInfo.origin_name} ({singleMovieInfo.year})
                </Typography>
                <Box display="flex" flexWrap="wrap" sx={{ pl: 2, pt: 1 }}>
                  <ShareIconButton
                    label="Facebook"
                    onClick={() => shareOnSocialMedia(FACEBOOK_URL)}
                    icon={FacebookIcon}
                    className={`${classes.iconButton} ${classes.facebookIcon}`}
                    tooltip="Chia sẻ qua Facebook"
                  />
                  <ShareIconButton
                    label="LinkedIn"
                    onClick={() => shareOnSocialMedia(LINKEDIN_URL)}
                    icon={LinkedInIcon}
                    className={`${classes.iconButton} ${classes.linkedInIcon}`}
                    tooltip="Chia sẻ qua LinkedIn"
                  />
                  <ShareIconButton
                    label="WhatsApp"
                    onClick={() => shareOnSocialMedia(WHATSAPP_URL)}
                    icon={WhatsAppIcon}
                    className={`${classes.iconButton} ${classes.whatsAppIcon}`}
                    tooltip="Chia sẻ qua WhatsApp"
                  />
                  <ShareIconButton
                    label="X"
                    onClick={() => shareOnSocialMedia(X_URL)}
                    icon={XIcon}
                    className={`${classes.iconButton} ${classes.XIcon}`}
                    tooltip="Chia sẻ qua X/Twitter"
                  />
                  <ShareIconButton
                    label="Telegram"
                    onClick={() => shareOnSocialMedia(TELEGRAM_URL)}
                    icon={TelegramIcon}
                    className={`${classes.iconButton} ${classes.telegramIcon}`}
                    tooltip="Chia sẻ qua Telegram"
                  />
                  <ShareIconButton
                    label="Copy"
                    onClick={copyToClipboard}
                    icon={ContentCopyIcon}
                    className={`${classes.iconButton} ${classes.copyIcon}`}
                    tooltip="Sao chép liên kết"
                  />
                </Box>
                <Typography
                  variant="body1"
                  sx={{ pl: 2, pt: 1, fontFamily: "Montserrat, sans-serif" }}
                >
                  {he.decode(singleMovieInfo.content)}
                </Typography>
                <Box sx={{ pl: 2, pt: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Thời lượng:
                  </Typography>
                  <Box display="flex" flexWrap="wrap">
                    <Chip
                      key={singleMovieInfo.time}
                      label={singleMovieInfo.time}
                      sx={{
                        color: "white",
                        backgroundColor: "transparent",
                        borderColor: "white",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                      className={classes.keyword}
                    />
                  </Box>
                </Box>
                <Box sx={{ pl: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Ngôn ngữ:
                  </Typography>
                  <Box display="flex" flexWrap="wrap">
                    <Chip
                      key={singleMovieInfo.lang}
                      label={singleMovieInfo.lang}
                      sx={{
                        color: "white",
                        backgroundColor: "transparent",
                        borderColor: "white",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                      className={classes.keyword}
                    />
                  </Box>
                </Box>
                <Box sx={{ pl: 2, pt: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Diễn viên:
                  </Typography>
                  <Box display="flex" flexWrap="wrap">
                    {singleMovieInfo.actor.map((actor, index) => (
                      <Chip
                        key={index}
                        avatar={
                          <Avatar className={classes.actorAvatar}>
                            {actor.charAt(0)}
                          </Avatar>
                        }
                        sx={{
                          color: "white",
                          backgroundColor: "transparent",
                          borderColor: "white",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                        label={he.decode(actor)}
                        className={classes.actorName}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ pl: 2, pt: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Quốc gia:
                  </Typography>
                  <Box display="flex" flexWrap="wrap">
                    {singleMovieInfo.country.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={he.decode(keyword.name)}
                        sx={{
                          color: "white",
                          backgroundColor: "transparent",
                          borderColor: "white",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                        className={classes.keyword}
                      />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ pl: 2, pt: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Từ khóa:
                  </Typography>
                  <Box display="flex" flexWrap="wrap">
                    {singleMovieInfo.category.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={he.decode(keyword.name)}
                        sx={{
                          color: "white",
                          backgroundColor: "transparent",
                          borderColor: "white",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                        className={classes.keyword}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default SingleMovie;
