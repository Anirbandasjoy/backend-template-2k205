import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";

const rootRouter: Router = Router();

const routes = [
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/auth",
    router: authRouter,
  },
];

routes.forEach((route) => {
  rootRouter.use(route.path, route.router);
});

export default rootRouter;
