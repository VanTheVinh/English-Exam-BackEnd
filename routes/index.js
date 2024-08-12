import userRouter from "./user.route.js";
import classRouter from "./class.route.js";
import studentRouter from "./student.route.js";
import examRouter from "./exam.route.js";
import questionRouter from "./question.route.js";
import resultRouter from "./result.route.js";

const routes = [
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/class",
    router: classRouter,
  },
  {
    path: "/student",
    router: studentRouter,
  },
  {
    path: "/exam",
    router: examRouter,
  },
  {
    path: "/question",
    router: questionRouter,
  },
  {
    path: "/result",
    router: resultRouter,
  },
];

export function routeFactory(app) {
  routes.forEach(route => {
    if (route.path === "/user") {
      app.use(route.path, route.router);
    }
    if (route.path === "/class") {
      app.use(route.path, route.router);
    }
    if (route.path === "/student") {
      app.use(route.path, route.router);
    }
    if (route.path === "/exam") {
      app.use(route.path, route.router);
    }
    if (route.path === "/question") {
      app.use(route.path, route.router);
    }
    if (route.path === "/result") {
      app.use(route.path, route.router);
    }
  });
}
