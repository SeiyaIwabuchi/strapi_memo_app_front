import { useNavigate, useSearchParams } from "react-router-dom";
import IndexRoutes from "../router/IndexRoutes";
import { userApi } from "../providers/Providers";
import { useSetAtom } from "jotai";
import { LoggedInAtom, userNameAtom } from "../states/Credential/CredentialState";
import { useEffect } from "react";
import snackbarStateAtom from "../states/SnackbarStateAtom";
import { Typography } from "@mui/material";

export default function AuthCallbackPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const setLoggedIn = useSetAtom(LoggedInAtom);
    const setUserName = useSetAtom(userNameAtom);
    const setSnackbar = useSetAtom(snackbarStateAtom);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const accessToken = searchParams.get("access_token");
            if (accessToken) {
                try {
                    const auth = await userApi.authentication(accessToken);
                    localStorage.setItem('jwt', auth.jwt);
                    setLoggedIn(true);
                    setUserName(auth.user.username);
                    setSnackbar({ isShow: true, message: "ログインに成功しました。" });
                } catch {
                    setSnackbar({ isShow: true, message: "アクセス権がありません。" });
                }
            } else {
                setSnackbar({ isShow: true, message: "アクセス権がありません。" });
            }
            navigate(IndexRoutes.IndexPage.path, { replace: true });
        })();
    }, []);

    return (
        <Typography variant="body1">ログイン処理を行っています。</Typography>
    );
}