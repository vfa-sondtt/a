import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useStorage } from "vue3-storage";
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
  const curentUser = useStorage().getStorageSync("currentUser");
  console.log("ddieuf kien", curentUser);
  return curentUser?.accessToken;
}

export default router;
