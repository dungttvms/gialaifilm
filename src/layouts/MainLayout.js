import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Box, Stack, styled } from "@mui/material";

const FixedHeader = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
}));

function MainLayout() {
  const headerHeight = 64;

  const footerStyles = {
    flexShrink: 0,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "primary.main",
      }}
    >
      <FixedHeader>
        <MainHeader />
      </FixedHeader>
      <Box sx={{ pt: `${headerHeight}px`, flexGrow: 1 }}>
        <Outlet />
      </Box>
      <MainFooter sx={footerStyles} />
    </Stack>
  );
}

export default MainLayout;
