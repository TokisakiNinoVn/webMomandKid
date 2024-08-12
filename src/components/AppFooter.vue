<template>
  <footer class="footer-container">
    <div class="footer-top">
      <div class="footer-top-item">
        <i class="fa fa-truck"></i> MIỄN PHÍ VẬN CHUYỂN<br>
        <span class="footer-description">Cho Đơn Đặt Hàng Trên 300.000 Đ</span>
      </div>
      <div class="footer-top-item">
        <i class="fa fa-undo"></i> HOÀN 100% TIỀN MUA HÀNG<br>
        <span class="footer-description">Trong vòng 7 ngày</span>
      </div>
      <div class="footer-top-item">
        <i class="fa fa-bolt"></i> GIAO HÀNG NHANH CHÓNG<br>
        <span class="footer-description">Sau 2h kể từ khi xác nhận</span>
      </div>
      <div class="footer-hotline">
        Hotline<br>
        <span class="footer-hotline-number">0987535533 - 0463289232</span>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-column">
        <h4 class="footer-heading">HỆ THỐNG CỬA HÀNG</h4>
        <p class="footer-address">Hà Nội: Số 25 ngõ 168 Hào Nam, Đống Đa (CÓ CHỖ ĐỂ XE)</p>
        <p class="footer-phone">0987535533 - 02463289232</p>
        <p class="footer-address">Thái Nguyên: 309A Lương Ngọc Quyến</p>
        <p class="footer-phone">02086565565 - 0936290790</p>
        <p class="footer-address">Việt Trì: 1180 Đại Lộ Hùng Vương</p>
        <p class="footer-phone">0964686655</p>
      </div>
      <div class="footer-column">
        <h4 class="footer-heading">ĐỐI TÁC</h4>
        <p class="footer-partner">Đối tác HCM: 77 Phan Đăng Lưu</p>
        <p class="footer-phone">0908691727</p>
        <h4 class="footer-heading">THẮC MẮC KHIẾU NẠI</h4>
        <p class="footer-complaint">Hotline: 0935698886</p>
      </div>
      <div class="footer-column">
        <h4 class="footer-heading">TIN TỨC</h4>
        <p class="footer-news">Tin tức mẹ và bé</p>
        <p class="footer-news">Tin Khuyến mại</p>
        <p class="footer-news">Chăm Con</p>
        <p class="footer-news">Dạy con</p>
        <p class="footer-news">Tin Mẹ Bầu</p>
        <p class="footer-news">Mẹo cho mẹ</p>
      </div>
      <div class="footer-column">
        <h4 class="footer-heading">THÔNG TIN HỖ TRỢ</h4>
        <p class="footer-support">Phương thức thanh toán</p>
        <p class="footer-support">Trợ giúp</p>
        <h4 class="footer-heading">LIÊN KẾT</h4>
        <p class="footer-connect">Hãy kết nối với chúng tôi.</p>
        <div class="social-icons">
          <a href="" class="link-contact"><ion-icon name="logo-facebook"></ion-icon></a>
          <a href="" class="link-contact"><ion-icon name="logo-twitter"></ion-icon></a>
          <a href="" class="link-contact"><ion-icon name="logo-youtube"></ion-icon></a>
          <a href="" class="link-contact"><ion-icon name="heart-outline"></ion-icon></a>
          <a href="" class="link-contact"><ion-icon name="logo-github"></ion-icon></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
.footer-container {
  background-color: #ff4381;
  color: white;
  padding: 30px 0;
  z-index: 1;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 2px solid white;
  flex-wrap: wrap;
}

.footer-top-item, 
.footer-hotline {
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
  flex: 1;
}

.footer-description {
  display: block;
  font-size: 12px;
  margin-top: 5px;
}

.footer-top-item i {
  font-size: 20px;
  margin-right: 8px;
}

.footer-hotline-number {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-wrap: wrap;
}

.footer-column {
  width: 22%;
  margin: 10px 0;
}

.footer-heading {
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: bold;
}

.footer-address,
.footer-phone,
.footer-partner,
.footer-complaint,
.footer-news,
.footer-support,
.footer-connect {
  font-size: 14px;
  margin: 5px 0;
}

.social-icons {
  display: flex;
  margin-top: 10px;
}

.social-icons a {
  color: white;
  margin-right: 10px;
  font-size: 22px;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #ffdbdb;
}
</style>
