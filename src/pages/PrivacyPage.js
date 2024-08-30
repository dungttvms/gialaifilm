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
function PrivacyPage() {
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
        CHÍNH SÁCH QUYỀN RIÊNG TƯ
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        1. Mục đích và Phạm vi thu thập thông tin cá nhân
      </Typography>

      <Typography className={classes.paragraph}>
        Chúng tôi thu thập thông tin cá nhân từ người dùng nhằm cung cấp dịch vụ
        tốt nhất có thể. Các loại thông tin cá nhân mà chúng tôi thu thập bao
        gồm, nhưng không giới hạn, họ tên, địa chỉ email, số điện thoại, và địa
        chỉ IP. Thông tin này được sử dụng để xác minh danh tính người dùng, hỗ
        trợ khách hàng, và cải thiện chất lượng dịch vụ.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        2. Phạm vi sử dụng thông tin
      </Typography>
      <Typography className={classes.paragraph}>
        Thông tin cá nhân của bạn sẽ được sử dụng cho các mục đích sau: Cung cấp
        các dịch vụ và sản phẩm liên quan đến website phimgialai.netlify.app.
        Thực hiện các quy trình xác thực khi bạn đăng nhập bằng tài khoản
        Facebook hoặc các tài khoản khác. Cải thiện trải nghiệm người dùng bằng
        cách tùy biến giao diện và tính năng của website dựa trên sở thích của
        bạn. Gửi thông báo về các cập nhật hoặc thay đổi chính sách dịch vụ. Xử
        lý các khiếu nại và tranh chấp phát sinh.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        3. Chia sẻ và tiết lộ thông tin cá nhân
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi cam kết không chia sẻ, bán, hoặc trao đổi thông tin cá nhân
        của bạn với bên thứ ba trừ khi có sự đồng ý của bạn hoặc yêu cầu từ các
        cơ quan pháp luật. Trong trường hợp cần thiết, chúng tôi có thể chia sẻ
        thông tin với các đối tác liên quan nhằm cung cấp dịch vụ tốt hơn, tuy
        nhiên, các đối tác này sẽ phải tuân thủ chính sách bảo mật thông tin
        nghiêm ngặt của chúng tôi.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        4. Bảo vệ thông tin cá nhân
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức cần thiết để bảo vệ
        thông tin cá nhân của bạn khỏi việc truy cập, sử dụng, hoặc tiết lộ trái
        phép. Các biện pháp này bao gồm nhưng không giới hạn ở việc mã hóa dữ
        liệu, sử dụng tường lửa, và kiểm soát truy cập nghiêm ngặt. Ngoài ra,
        chúng tôi thường xuyên kiểm tra và cập nhật hệ thống bảo mật để đảm bảo
        an toàn cho thông tin của bạn.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        5. Quyền của người dùng
      </Typography>
      <Typography className={classes.paragraph}>
        Bạn có quyền yêu cầu chúng tôi cung cấp thông tin cá nhân mà chúng tôi
        đã thu thập, hoặc yêu cầu chúng tôi xóa hoặc chỉnh sửa thông tin đó.
        Ngoài ra, bạn cũng có quyền rút lại sự đồng ý của mình đối với việc thu
        thập và sử dụng thông tin cá nhân bất cứ lúc nào.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        6. Thời gian lưu trữ thông tin
      </Typography>
      <Typography className={classes.paragraph}>
        Thông tin cá nhân của bạn sẽ được lưu trữ trong khoảng thời gian cần
        thiết để hoàn thành các mục đích được nêu trong chính sách này, hoặc
        trong khoảng thời gian theo yêu cầu của pháp luật. Sau đó, thông tin sẽ
        được xóa khỏi hệ thống của chúng tôi.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        7. Cookies và Công nghệ theo dõi
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi sử dụng cookies và các công nghệ theo dõi khác để thu thập
        thông tin về hành vi duyệt web của bạn trên trang web của chúng tôi.
        Thông tin này giúp chúng tôi hiểu rõ hơn về nhu cầu và sở thích của bạn,
        từ đó cải thiện dịch vụ và trải nghiệm người dùng.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        8. Thay đổi Chính sách Riêng tư
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi có thể cập nhật chính sách này bất cứ lúc nào. Mọi thay đổi sẽ
        được thông báo rõ ràng trên trang web, và bạn nên thường xuyên kiểm tra
        để cập nhật thông tin mới nhất về chính sách của chúng tôi.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        9. Liên hệ
      </Typography>
      <Typography className={classes.paragraph}>
        Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến chính sách
        riêng tư này, xin vui lòng liên hệ với chúng tôi qua email hoặc số điện
        thoại được cung cấp trên trang web.
      </Typography>

      <Typography variant="h5" className={classes.heading}>
        THÔNG TIN LIÊN HỆ
      </Typography>
      <Typography className={classes.contactInfo}>
        Website Phim Gia Lai
        <br /> Telegram: t.me/phimnguon
      </Typography>
    </Container>
  );
}

export default PrivacyPage;
