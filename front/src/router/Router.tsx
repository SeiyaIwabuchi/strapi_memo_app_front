import { createBrowserRouter, RouteObject } from "react-router-dom";
import IndexRoutes from "./IndexRoutes";
import MemoRoutes from "./MemoRoutes";
import AuthCallbackRoutes from "./AuthCallbackRouter";

const routes: {[key: string]: RouteObject} = {
    ...IndexRoutes,
    ...MemoRoutes,
    ...AuthCallbackRoutes
};

export const router = createBrowserRouter(Object.values(routes), {
    basename: import.meta.env.VITE_APP_BASE_PATH,
});