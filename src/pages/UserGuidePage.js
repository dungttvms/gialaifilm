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

    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: theme.spacing(3),
    color: "white",
  },
}));
function UserGuidePage() {
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
        <title>Điều khoản Riêng tư | Phim Gia Lai</title>
      </Helmet>
      <Typography
        variant="h5"
        className={classes.heading}
        sx={{ pt: 2, fontWeight: "bold" }}
      >
        HƯỚNG DẪN SỬ DỤNG WEBSITE PHIM GIA LAI
      </Typography>
      <Typography className={classes.paragraph}>
        Chào mừng bạn đến với website xem phim của chúng tôi! Dưới đây là hướng
        dẫn đơn giản giúp bạn sử dụng và tận hưởng nền tảng của chúng tôi:
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        1. Tìm kiếm phim:
      </Typography>
      <Typography className={classes.paragraph}>
        Sử dụng thanh tìm kiếm ở đầu trang để tìm phim cụ thể hoặc duyệt qua các
        danh mục và thể loại từ menu chính.
      </Typography>{" "}
      <br />
      <Typography className={classes.paragraph}>
        Bạn cũng có thể khám phá các phim mới phát hành và phim nổi bật trên
        trang chủ.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        2. Xem phim:
      </Typography>
      <Typography className={classes.paragraph}>
        Nhấp vào hình thu nhỏ của phim để xem chi tiết phim.
      </Typography>
      <br />>
      <Typography className={classes.paragraph}>
        Nhấn nút "Phát" để bắt đầu xem phim trực tiếp trên website.
      </Typography>
      <br />>
      <Typography className={classes.paragraph}>
        Sử dụng các điều khiển của trình phát video để tạm dừng, phát, điều
        chỉnh âm lượng hoặc chuyển chế độ toàn màn hình.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        3. Tạo tài khoản:
      </Typography>
      <Typography className={classes.paragraph}>
        Để theo dõi phim yêu thích và lịch sử xem phim, hãy tạo tài khoản bằng
        cách nhấp vào nút "Đăng Ký".
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Nhập địa chỉ email và tạo mật khẩu để đăng ký.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        4. Đăng Nhập:
      </Typography>
      <Typography className={classes.paragraph}>
        Nếu bạn đã có tài khoản, nhấp vào nút "Đăng Nhập" và nhập thông tin đăng
        nhập của bạn.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Bạn cũng có thể đăng nhập bằng tài khoản Facebook/Google để tiết kiệm
        thời gian.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        5. Quản Lý Tài Khoản:
      </Typography>
      <Typography className={classes.paragraph}>
        Khi đã đăng nhập, bạn có thể quản lý hồ sơ của mình, cập nhật thông tin
        cá nhân và xem các phim yêu thích từ bảng điều khiển tài khoản.
      </Typography>
      <Typography
        variant="h5"
        className={classes.heading}
        sx={{ pt: 2, fontWeight: "bold" }}
      >
        CÁCH XÓA COOKIES TRÊN TRÌNH DUYỆT
      </Typography>
      <Typography className={classes.paragraph}>
        Việc xóa cookies có thể giúp cải thiện hiệu suất website và trải nghiệm
        duyệt web của bạn. Dưới đây là cách xóa cookies trên các trình duyệt
        khác nhau:
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        1. Google Chrome:
      </Typography>
      <Typography className={classes.paragraph}>
        Mở Chrome và nhấp vào menu ba chấm ở góc trên bên phải.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Đi đến "Cài đặt", "Quyền riêng tư và bảo mật", "Cookies và dữ liệu trang
        web khác."
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Nhấp vào "Xem tất cả dữ liệu và quyền truy cập" và sau đó nhấp vào "Xóa
        tất cả."
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        2. Mozilla Firefox:
      </Typography>
      <Typography className={classes.paragraph}>
        Mở Firefox và nhấp vào menu ba dòng ở góc trên bên phải.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Đi đến "Tùy chọn", "Quyền riêng tư & bảo mật", "Cookies và dữ liệu trang
        web."
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Nhấp vào "Xóa dữ liệu" và chọn "Cookies và Dữ liệu trang web" trước khi
        nhấp vào "Xóa."
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        3. Safari:
      </Typography>
      <Typography className={classes.paragraph}>
        Mở Safari và nhấp vào "Safari" trên thanh menu trên cùng.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Đi đến "Sở thích", "Quyền riêng tư", "Quản lý dữ liệu trang web."
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Nhấp vào "Xóa tất cả" để xóa cookies và dữ liệu trang web khác.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        4. Microsoft Edge:
      </Typography>
      <Typography className={classes.paragraph}>
        Mở Edge và nhấp vào menu ba chấm ở góc trên bên phải.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Đi đến "Cài đặt", "Quyền riêng tư, tìm kiếm và dịch vụ", "Chọn những gì
        cần xóa."
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Chọn "Cookies và dữ liệu trang web khác" và nhấp vào "Xóa ngay."
      </Typography>
      <Typography
        variant="h5"
        className={classes.heading}
        sx={{ pt: 2, fontWeight: "bold" }}
      >
        CÁCH XÓA ỦY QUYỀN ĐĂNG NHẬP BẰNG FACEBOOK
      </Typography>
      <Typography className={classes.paragraph}>
        Nếu bạn đã đăng nhập bằng Facebook và muốn thu hồi ủy quyền, hãy làm
        theo các bước sau:
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        1. Truy Cập Cài Đặt Facebook:
      </Typography>
      <Typography className={classes.paragraph}>
        Mở Facebook và nhấp vào biểu tượng hồ sơ của bạn ở góc trên bên phải.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Chọn "Cài đặt & Quyền riêng tư", "Cài đặt."
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        2. Truy Cập Ứng Dụng và Trang Web:
      </Typography>
      <Typography className={classes.paragraph}>
        Trong thanh bên trái, nhấp vào "Ứng dụng và Trang web."
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        3. Xóa Ủy Quyền:
      </Typography>
      <Typography className={classes.paragraph}>
        Tìm website hoặc ứng dụng bạn muốn xóa khỏi danh sách ủy quyền.
      </Typography>
      <br />
      <Typography className={classes.paragraph}>
        Nhấp vào ô bên cạnh website hoặc ứng dụng đó, sau đó nhấp vào "Xóa."
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        4. Xác Nhận Xóa:
      </Typography>
      <Typography className={classes.paragraph}>
        Xác nhận sự lựa chọn của bạn bằng cách nhấp vào "Xóa" một lần nữa trong
        cửa sổ pop-up.
      </Typography>
      <br />
      <br />
      <Typography className={classes.paragraph}>
        Nếu cần thêm trợ giúp, vui lòng liên hệ với chúng tôi qua:
      </Typography>
      <Typography className={classes.contactInfo}>
        Website Phim Gia Lai
        <br /> Telegram: t.me/phimnguon
      </Typography>
    </Container>
  );
}

export default UserGuidePage;
