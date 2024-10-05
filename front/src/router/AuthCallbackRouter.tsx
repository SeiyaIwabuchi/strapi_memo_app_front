import { RouteObject } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import AuthCallbackPage from "../pages/AuthCallbackPage";

type Pages = "AuthCallbackPage";

const AuthCallbackRoutes: {[key in Pages]: RouteObject} = {
    AuthCallbackPage: {
        path: "/auth/callback",
        element: <AuthCallbackPage />
    },
};

export default AuthCallbackRoutes;