import { RouteObject } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import MemoTopPage from "../pages/MemoTopPage";

type Pages = "MemoTopPage";

const MemoRoutes: {[key in Pages]: RouteObject} = {
    MemoTopPage: {
        path: "/memo",
        element: <MemoTopPage />
    }
};

export default MemoRoutes;