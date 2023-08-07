import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import ForgotPass from "../pages/ForgotPass.vue";
import NewPass from "../pages/NewPass.vue";
import Note from "../pages/Note.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Note",
    component: Note,
    meta: { requiresAuth: true }, // Đánh dấu route này là protecteds
    // children: [{ path: "", component: () => import("pages/testingCode.vue") }],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/forgotpass",
    name: "ForgotPass",
    component: ForgotPass,
  },
  {
    path: "/newpass",
    name: "NewPass",
    component: NewPass,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/:catchAll(.*)", // Đặt đường dẫn cho route này là "*"
    component: NotFound,
  },
];

export default routes;
