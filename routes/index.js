import userRouter from "./user.route.js";

const routes = [
  {
    path: "/user",
    router: userRouter,
  },
];

export function routeFactory(app) {
  routes.forEach(route => {
    if (route.path === "/user") {
      app.use(route.path, route.router);
    }
  });
}
