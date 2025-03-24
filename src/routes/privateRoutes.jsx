import { configs } from "../configs";
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const privateRoutes = [
    { path: configs.routes.about, component: About, },
];