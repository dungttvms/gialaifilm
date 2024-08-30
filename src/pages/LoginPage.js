import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import useAuth from "../hooks/useAuth";
import backgroundImg from "../images/img-login.png";
import { toast } from "react-toastify";
import LoginWithGoogle from "../components/LoginWithGoogle";

const styles = {
  boxWrapIconSigIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    color: "secondary.lighter",
  },
  boxCover: {
    position: "relative",
    minHeight: "100vh",
    top: 0,
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    m: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "secondary.lighter",
  },
  boxWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
    width: 450,
    height: 300,
    borderTop: "0.1px solid white",
    borderBottom: "0.1px solid white",
    borderRadius: 3,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  boxCoverTypoBottom: {
    display: "flex",
    justifyContent: "space-between",
    p: 2,
  },
  typoBottom: {
    "&:hover": {
      cursor: "pointer",
      color: "white",
    },
  },
};

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSuccess = async ({ email, name, picture }) => {
    try {
      await auth.loginWithGoogle({ email, name, picture }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      toast.error("Login Error");
      navigate("/dang-nhap");
    }
  };

  const handleError = () => {
    navigate("/dang-nhap");
  };

  return (
    <Box sx={styles.boxCover}>
      <Box component="div" className="faded-div" />
      <Box sx={styles.boxWrap}>
        <Box sx={styles.boxWrapIconSigIn}>
          <LockIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography variant="h4" mb={3} sx={{ textAlign: "center" }}>
          Đăng nhập*
        </Typography>
        <LoginWithGoogle onSuccess={handleSuccess} onError={handleError} />
      </Box>
    </Box>
  );
}

export default LoginPage;
