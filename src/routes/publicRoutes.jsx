import { configs } from "../configs";
import OnlyHeader from "../layouts/OnlyHeader";
import About from "../pages/About";
import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const publicRoutes = [
    { path: configs.routes.home, component: Home, },
    { path: configs.routes.login, component: Login, layout: OnlyHeader },
    { path: configs.routes.register, component: Register, layout: OnlyHeader },
    { path: configs.routes.about, component: About, },
    { path: configs.routes.changePassword, component: ChangePassword, },
];