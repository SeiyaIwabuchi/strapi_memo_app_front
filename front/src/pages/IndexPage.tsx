import { useNavigate } from "react-router-dom";
import MemoRoutes from "../router/MemoRoutes";
import { useEffect } from "react";
import { Typography } from "@mui/material";

export default function IndexPage() {

    const navigate = useNavigate();

    useEffect(() => { 
        navigate(MemoRoutes.MemoTopPage.path, { replace: true });
    });

    return (
        <Typography>まだ内容は無いようです。</Typography>
    );
}