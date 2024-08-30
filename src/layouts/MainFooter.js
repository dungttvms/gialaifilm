import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

import { useDispatch, useSelector } from "react-redux";
import { getViewerCount } from "../features/movies/movieSlice.js";
import { fNumber } from "../utils/numberFormat.js";

const ICON_LINK = [
  {
    name: "twitter",
    icon: (
      <Link
        href="https://x.com/tran_tien_dzung"
        target="_blank"
        rel="noopener noreferrer"
      >
        <XIcon sx={{ color: "#ffffff ", width: "40px", height: "40px" }} />
      </Link>
    ),
  },
  {
    name: "facebook",
    icon: (
      <Link
        href="https://facebook.com/dungttvms"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon
          sx={{ color: "#1877F2", width: "40px", height: "40px" }}
        />
      </Link>
    ),
  },
  {
    name: "youtube",
    icon: (
      <Link
        href="https://www.youtube.com/@tiendungtran1385"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YouTubeIcon sx={{ color: "#FF0000", width: "40px", height: "40px" }} />
      </Link>
    ),
  },
  {
    name: "instagram",
    icon: (
      <Link
        href="https://www.instagram.com/dungttvms/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon
          sx={{ color: "#E4405F", width: "40px", height: "40px" }}
        />
      </Link>
    ),
  },
];

function MainFooter() {
  const dispatch = useDispatch();
  const viewerCountFromRedux = useSelector(
    (state) => state.movie?.totalViewers
  );
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    localStorage.removeItem("viewerCount");

    dispatch(getViewerCount());
  }, [dispatch]);

  useEffect(() => {
    if (viewerCountFromRedux !== null && viewerCountFromRedux !== undefined) {
      setViewerCount(viewerCountFromRedux);

      localStorage.setItem("viewerCount", viewerCountFromRedux.toString());
    }
  }, [viewerCountFromRedux]);

  return (
    <Container maxWidth="lg" sx={{ pt: 3, position: "relative" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Stack mt={1} spacing={3} direction="row" name="link">
                {ICON_LINK.map((value) => (
                  <Tooltip
                    sx={{
                      "&:hover": {
                        opacity: [0.9, 0.8, 0.7],
                        cursor: "pointer",
                      },
                    }}
                    key={value.name}
                    title={value.name}
                    enterDelay={500}
                    leaveDelay={200}
                  >
                    {value.icon}
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          my: 1,
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.85rem",
        }}
      >
        Đã có {fNumber(viewerCount)} lượt truy cập
      </Typography>{" "}
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          my: 1,
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.85rem",
        }}
      >
        {`Copyright © `}
        <Link
          href="https://kkphim.vip"
          underline="none"
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Phim miễn phí,
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ pb: 1 }}>
        <Link
          component={RouterLink}
          to="/gioi-thieu"
          underline="none"
          color="text.secondary"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          Giới thiệu
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          |
        </Typography>
        <Link
          component={RouterLink}
          to="/huong-dan-su-dung"
          underline="none"
          color="text.secondary"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          Hướng dẫn sử dụng
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          |
        </Typography>
        <Link
          component={RouterLink}
          to="/dieu-khoan-bao-mat"
          underline="none"
          color="text.secondary"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          Điều khoản Bảo mật
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          |
        </Typography>
        <Link
          component={RouterLink}
          to="/chinh-sach-quyen-rieng-tu"
          underline="none"
          color="text.secondary"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          Chính sách quyền riêng tư
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          |
        </Typography>
        <Link
          component={RouterLink}
          to="/khieu-nai-ban-quyen"
          underline="none"
          color="text.secondary"
          sx={{
            my: 1,
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
          }}
        >
          Khiếu nại bản quyền
        </Link>
      </Stack>
    </Container>
  );
}

export default MainFooter;
