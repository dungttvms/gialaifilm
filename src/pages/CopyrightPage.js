import { Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";
import useAuth from "../hooks/useAuth";
const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(3),
    textAlign: "left",
    fontWeight: "bold",
    color: "orange",
    padding: 3,
  },
  paragraph: {
    textAlign: "justify",

    paddingLeft: "20px",
    paddingRight: "20px",
    color: "white",
  },
  contactInfo: {
    textAlign: "justify",
    marginTop: theme.spacing(3),
    color: "white",
  },
}));
function CopyrightPage() {
  const classes = useStyles();
  const scrollRef = useRef(null);
  const { user } = useAuth();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <Container
      ref={scrollRef}
      maxWidth="lg"
      sx={{ pt: 5, position: "relative" }}
    >
      <Helmet>
        <title>Bản Quyền | Phim Gia Lai</title>
      </Helmet>
      <Typography
        variant="h5"
        className={classes.heading}
        sx={{ pt: 2, fontWeight: "bold" }}
      >
        KHIẾU NẠI BẢN QUYỀN
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        {user ? `Chào ${user.name},` : "Chào bạn,"}
      </Typography>

      <Typography className={classes.paragraph}>
        Chào quý khách, Chúng tôi tại Phim Gia Lai (phimgialai.netlify.app) cam
        kết tuân thủ các quy định về bản quyền và sở hữu trí tuệ. Chúng tôi hiểu
        rằng việc bảo vệ quyền lợi của các nhà sản xuất nội dung là rất quan
        trọng và chúng tôi luôn nỗ lực để đảm bảo rằng nội dung trên website của
        chúng tôi không vi phạm bất kỳ quyền sở hữu trí tuệ nào.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        Nguồn Nội Dung
      </Typography>
      <Typography className={classes.paragraph}>
        Nội dung phim trên website của chúng tôi được lấy từ các nguồn chính
        thống và công khai trên internet. Chúng tôi chỉ cung cấp liên kết và
        thông tin liên quan đến các phim đã được công khai hoặc có sự đồng ý của
        các nhà sản xuất.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        Chúng tôi sẵn sàng gỡ bỏ nội dung nếu có vi phạm bản quyền
      </Typography>
      <Typography className={classes.paragraph}>
        Nếu bạn là chủ sở hữu bản quyền hoặc đại diện của chủ sở hữu bản quyền
        và bạn phát hiện nội dung của mình được sử dụng trên trang web của chúng
        tôi mà không có sự cho phép, xin vui lòng liên hệ với chúng tôi để chúng
        tôi có thể xử lý yêu cầu của bạn. Chúng tôi cam kết sẽ gỡ bỏ ngay lập
        tức các nội dung vi phạm theo yêu cầu của bạn.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        Liên hệ để xử lý khiếu nại
      </Typography>
      <Typography className={classes.paragraph}>
        Để gửi khiếu nại về bản quyền hoặc yêu cầu gỡ bỏ nội dung, xin vui lòng
        liên hệ với chúng tôi qua:
      </Typography>
      <Typography className={classes.paragraph}>
        Telegram: t.me/phimnguon
      </Typography>

      <Typography className={classes.paragraph}>
        Chúng tôi sẽ xem xét và phản hồi yêu cầu của bạn trong thời gian sớm
        nhất.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Cảm ơn sự hợp tác của bạn!
      </Typography>
      <br />
      <Typography className={classes.paragraph} sx={{ fontWeight: "bold" }}>
        BQT Website Phim Gia Lai
      </Typography>
    </Container>
  );
}

export default CopyrightPage;
