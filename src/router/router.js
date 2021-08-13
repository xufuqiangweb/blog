// 引入路由组件
import Home from "@/pages/Home/Home";
import Web from "@/pages/Web/Web";
import Engineering from "@/pages/Engineering/Engineering";
import Service from "@/pages/Service/Service";
import Database from "@/pages/Database/Database";
import Software from "@/pages/Software/Software";
import About from "@/pages/About/About";

const router = [
  {
    path: "/",
    component: Home,
    exact: true,
    title: "首页",
  },
  {
    path: "/web",
    component: Web,
    exact: true,
    title: "Web前端",
  },
  {
    path: "/engineering",
    component: Engineering,
    exact: true,
    title: "前端工程化",
  },
  {
    path: "/service",
    component: Service,
    exact: true,
    title: "服务端",
  },
  {
    path: "/database",
    component: Database,
    exact: true,
    title: "数据库",
  },
  {
    path: "/software",
    component: Software,
    exact: true,
    title: "软件&工具",
  },
  {
    path: "/about",
    component: About,
    exact: false,
    title: "关于&留言",
  },
];
export default router;
