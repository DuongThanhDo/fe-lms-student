import { configs } from "../configs";
import NoContainer from "../layouts/NoContainer";
import OnlyHeader from "../layouts/OnlyHeader";
import About from "../pages/About";
import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Teacher from "../pages/Teacher";
import DetailTeacher from "../pages/Teacher/DetailTeacher";

export const publicRoutes = [
    { path: configs.routes.home, component: Home, },
    { path: configs.routes.login, component: Login, layout: OnlyHeader },
    { path: configs.routes.register, component: Register, layout: OnlyHeader },
    { path: configs.routes.about, component: About, },
    { path: configs.routes.changePassword, component: ChangePassword, },
    { path: configs.routes.profile, component: Profile, },
    { path: configs.routes.teacher, component: Teacher, },
    { path: configs.routes.detailTeacher, component: DetailTeacher, },
];