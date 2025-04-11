import { configs } from "../configs";
import CourseLayout from "../layouts/CourseLayout";
import NoContainer from "../layouts/NoContainer";
import OnlyHeader from "../layouts/OnlyHeader";
import About from "../pages/About";
import ChangePassword from "../pages/ChangePassword";
import Courses from "../pages/Course";
import CourseDetail from "../pages/CourseDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Teacher from "../pages/Teacher";
import DetailTeacher from "../pages/Teacher/DetailTeacher";
import ViewCourse from "../pages/ViewCourse";
import Lecture from "../pages/ViewCourse/contens/Lecture";

export const publicRoutes = [
    { path: configs.routes.home, component: Home, },
    { path: configs.routes.login, component: Login, layout: OnlyHeader },
    { path: configs.routes.register, component: Register, layout: OnlyHeader },
    { path: configs.routes.about, component: About, },
    { path: configs.routes.changePassword, component: ChangePassword, },
    { path: configs.routes.profile, component: Profile, },
    { path: configs.routes.teacher, component: Teacher, },
    { path: configs.routes.courses, component: Courses, },
    { path: configs.routes.detailTeacher, component: DetailTeacher, },
    { path: configs.routes.detailCourse, component: CourseDetail, },
    { path: configs.routes.detailMyCourse, component: ViewCourse, layout: null},
    { path: configs.routes.lectureCourse, component: Lecture, layout: CourseLayout},
];