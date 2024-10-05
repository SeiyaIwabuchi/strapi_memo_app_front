import { RouteObject } from "react-router-dom";
import IndexPage from "../pages/IndexPage";

type Pages = "IndexPage";

const IndexRoutes: {[key in Pages]: RouteObject} = {
    IndexPage: {
        index: true,
        path: "/",
        element: <IndexPage />
    },
};

export default IndexRoutes;