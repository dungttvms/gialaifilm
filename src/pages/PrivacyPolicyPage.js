import React, { useEffect, useRef } from "react";
import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(3),
    textAlign: "left",
    fontWeight: "bold",
    color: "orange",
  },
  paragraph: {
    textAlign: "justify",

    paddingLeft: "20px",
    paddingRight: "20px",
    color: "white",
  },
}));
function PrivacyPolicyPage() {
  const scrollRef = useRef(null);
  const classes = useStyles();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <Container
      ref={scrollRef}
      maxWidth="lg"
      sx={{ pt: 5, position: "relative" }}
    >
      <Helmet>
        <title>Chính sách Bảo mật | Phim Gia Lai</title>
      </Helmet>
      <Typography
        variant="h5"
        className={classes.heading}
        sx={{ pt: 2, fontWeight: "bold" }}
      >
        CHÍNH SÁCH BẢO MẬT
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        1. Cam kết bảo mật
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và duy trì mức độ bảo
        mật cao nhất có thể. Chính sách bảo mật này giải thích cách chúng tôi
        thu thập, sử dụng, và bảo vệ thông tin của bạn khi bạn sử dụng dịch vụ
        của phimgialai.netlify.app.
      </Typography>

      <Typography variant="h5" className={classes.heading}>
        2. Thu thập thông tin
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi thu thập thông tin từ bạn khi bạn truy cập trang web, đăng ký
        tài khoản, hoặc sử dụng các dịch vụ của chúng tôi. Thông tin này có thể
        bao gồm nhưng không giới hạn ở tên, địa chỉ email, địa chỉ IP, và các
        thông tin liên quan đến phương thức thanh toán. Thông tin được thu thập
        thông qua các biểu mẫu đăng ký, cookies, và các công cụ theo dõi tương
        tự.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        3. Sử dụng thông tin
      </Typography>
      <Typography className={classes.paragraph}>
        Thông tin của bạn được sử dụng để: Cung cấp và quản lý các dịch vụ mà
        bạn yêu cầu. Xử lý các giao dịch và cung cấp dịch vụ hỗ trợ khách hàng.
        Nâng cao chất lượng dịch vụ bằng cách phân tích hành vi người dùng. Gửi
        thông báo về các cập nhật và chương trình khuyến mãi. Đảm bảo an ninh và
        phát hiện các hành vi lừa đảo hoặc vi phạm điều khoản sử dụng.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        4. Bảo vệ thông tin
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi sử dụng các biện pháp bảo mật kỹ thuật và quản lý để bảo vệ
        thông tin cá nhân của bạn khỏi việc truy cập, sử dụng, hoặc tiết lộ trái
        phép. Các biện pháp này bao gồm mã hóa dữ liệu, sử dụng các hệ thống bảo
        mật tiên tiến, và đào tạo nhân viên về an ninh thông tin. Chúng tôi cũng
        thường xuyên rà soát và nâng cấp hệ thống để đảm bảo an toàn tuyệt đối.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        5. Quyền của bạn
      </Typography>
      <Typography className={classes.paragraph}>
        Bạn có quyền truy cập, chỉnh sửa, hoặc yêu cầu xóa thông tin cá nhân của
        mình mà chúng tôi đang lưu trữ. Bạn cũng có quyền từ chối việc thu thập
        và sử dụng thông tin của mình theo các điều khoản của chính sách này.
        Nếu bạn có bất kỳ thắc mắc hoặc khiếu nại nào về việc chúng tôi xử lý
        thông tin của bạn, bạn có thể liên hệ với chúng tôi qua các kênh hỗ trợ
        khách hàng.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        6. Chia sẻ thông tin
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi không chia sẻ thông tin cá nhân của bạn với bất kỳ bên thứ ba
        nào trừ khi cần thiết để cung cấp dịch vụ hoặc khi có yêu cầu từ cơ quan
        pháp luật. Khi thông tin cá nhân của bạn cần được chia sẻ, chúng tôi sẽ
        đảm bảo rằng bên nhận thông tin tuân thủ các quy định bảo mật nghiêm
        ngặt.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        7. Bảo mật thanh toán
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi áp dụng các tiêu chuẩn bảo mật cao nhất để bảo vệ thông tin
        thanh toán của bạn. Các giao dịch trực tuyến được bảo vệ bằng công nghệ
        mã hóa SSL và các biện pháp an ninh tiên tiến khác. Thông tin thanh toán
        của bạn sẽ không được lưu trữ trừ khi bạn cho phép, và sẽ được xử lý an
        toàn thông qua các đối tác thanh toán đáng tin cậy.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        8. Cookies và theo dõi
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi sử dụng cookies và các công nghệ theo dõi để thu thập thông
        tin về hành vi duyệt web của bạn. Cookies giúp chúng tôi cải thiện trải
        nghiệm người dùng, tối ưu hóa hiệu suất trang web, và cung cấp các nội
        dung phù hợp với sở thích của bạn. Bạn có thể từ chối hoặc xóa cookies
        thông qua cài đặt trình duyệt, nhưng điều này có thể ảnh hưởng đến việc
        sử dụng dịch vụ của chúng tôi.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        9. Thay đổi chính sách bảo mật
      </Typography>
      <Typography className={classes.paragraph}>
        Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để phản
        ánh các thay đổi trong hoạt động của chúng tôi hoặc các quy định pháp
        lý. Bất kỳ thay đổi nào sẽ được thông báo qua email hoặc trên trang web,
        và bạn nên thường xuyên kiểm tra để đảm bảo bạn luôn cập nhật thông tin
        mới nhất.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        10. Liên hệ
      </Typography>
      <Typography className={classes.paragraph}>
        Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về chính sách bảo mật này,
        xin vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được
        cung cấp trên trang web.
      </Typography>
    </Container>
  );
}

export default PrivacyPolicyPage;
