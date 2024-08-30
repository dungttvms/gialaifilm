import { Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";

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
function AboutUsPage() {
  const classes = useStyles();
  const scrollRef = useRef(null);
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
        <title>Giới thiệu | Phim Gia Lai</title>
      </Helmet>
      <Typography
        variant="h5"
        className={classes.heading}
        sx={{ pt: 2, fontWeight: "bold" }}
      >
        GIỚI THIỆU VỀ PHIM GIA LAI
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        Chào mừng đến với Phim Gia Lai!
      </Typography>

      <Typography className={classes.paragraph}>
        Phim Gia Lai (phimgialai.netlify.app) là một nền tảng trực tuyến hàng
        đầu dành cho những người yêu thích phim ảnh. Chúng tôi cung cấp một bộ
        sưu tập phong phú các bộ phim từ nhiều thể loại khác nhau, từ hành động,
        hài hước, lãng mạn, đến kinh dị và tài liệu, giúp bạn có những trải
        nghiệm giải trí tuyệt vời ngay tại nhà.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        Chúng tôi mang đến cho bạn:
      </Typography>
      <Typography className={classes.paragraph}>
        Kho Phim Đa Dạng: Chúng tôi liên tục cập nhật các bộ phim mới nhất và
        phổ biến nhất từ nhiều nguồn chính thống, giúp bạn luôn được thưởng thức
        các tác phẩm điện ảnh hot nhất và chất lượng nhất.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Giao Diện Thân Thiện: Với thiết kế giao diện dễ sử dụng và thân thiện,
        bạn có thể dễ dàng tìm kiếm và lựa chọn các bộ phim yêu thích chỉ với
        vài cú nhấp chuột. Tìm kiếm phim theo thể loại, năm phát hành, hoặc tên
        phim chưa bao giờ dễ dàng hơn thế.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Chất Lượng Xem Phim Cao: Chúng tôi cam kết cung cấp các bộ phim với chất
        lượng hình ảnh và âm thanh tốt nhất để bạn có thể tận hưởng từng chi
        tiết của bộ phim một cách rõ ràng và sắc nét.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Xem Phim Miễn Phí: Tất cả nội dung trên website của chúng tôi được cung
        cấp miễn phí. Chúng tôi tin rằng giải trí không nên có rào cản tài
        chính, vì vậy chúng tôi luôn cố gắng mang đến trải nghiệm phim chất
        lượng cao mà không tốn kém cho người dùng.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        Nguồn Nội Dung:
      </Typography>

      <Typography className={classes.paragraph}>
        Nội dung phim trên website của chúng tôi được lấy từ các nguồn chính
        thống và công khai trên internet. Chúng tôi nỗ lực đảm bảo rằng các phim
        được trình chiếu trên trang web đều hợp pháp và không vi phạm quyền sở
        hữu trí tuệ.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        Cam Kết Của Chúng Tôi:
      </Typography>

      <Typography className={classes.paragraph}>
        Chúng tôi cam kết mang đến dịch vụ tốt nhất và luôn lắng nghe ý kiến
        phản hồi từ người dùng. Nếu bạn gặp bất kỳ vấn đề nào hoặc có ý kiến
        đóng góp, xin vui lòng liên hệ với chúng tôi qua Telegram
        (t.me/phimnguon) hoặc các kênh hỗ trợ khác. Chúng tôi luôn sẵn sàng hỗ
        trợ và cải thiện dịch vụ để đáp ứng nhu cầu của bạn.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Cảm ơn bạn đã chọn Phim Gia Lai! Chúng tôi rất vui khi được đồng hành
        cùng bạn trong hành trình khám phá thế giới điện ảnh đầy màu sắc.
      </Typography>
      <br />
      <Typography className={classes.paragraph} sx={{ fontWeight: "bold" }}>
        BQT Website Phim Gia Lai
      </Typography>
    </Container>
  );
}

export default AboutUsPage;
