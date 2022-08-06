import NotFoundPage from "../pages/404.jsx";
import LoginPage from "../pages/adm/login.jsx";
import RegistrationDetail from "../pages/adm/registration-detail.jsx";
import RegistrationList from "../pages/adm/registration-list";
import HomePage from "../pages/home.jsx";
import RegisterSuccessPage from "../pages/register-success";
import RegisterPage from "../pages/register.jsx";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/dangky",
    component: RegisterPage,
  },
  {
    path: "/dangky/thanhcong",
    component: RegisterSuccessPage,
  },
  {
    path: "/quanly/dangnhap",
    component: LoginPage,
  },
  {
    path: "/quanly/cusi",
    component: RegistrationList,
  },
  {
    path: "/quanly/cusi/:id",
    component: RegistrationDetail,
  },
  {
    path: "/quanly",
    component: RegistrationList,
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
