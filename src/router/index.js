import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Kiểm tra xem route hiện tại có yêu cầu xác thực (requiresAuth) hay không
  if (to.meta.requiresAuth) {
    // Nếu trạng thái đăng nhập là false, chuyển hướng đến trang đăng nhập
    if (!isUserLoggedIn()) {
      next("/login");
    } else {
      next(); // Tiếp tục điều hướng đến route bảo vệ
    }
  } else {
    next(); // Tiếp tục điều hướng đến các route không yêu cầu xác thực
  }
});

function isUserLoggedIn() {
  // Đoạn này là hàm xác định trạng thái đăng nhập của người dùng
  // Đoạn mã này sẽ phụ thuộc vào cơ chế xác thực bạn sử dụng (Vuex, cookies, JWT, v.v.)
  // Trả về true nếu người dùng đã đăng nhập, false nếu chưa đăng nhập
  // Ví dụ:
  return !!localStorage.getItem("accessToken"); // Giả sử token được lưu trong localStorage
}

export default router;
