import { AppBar as MuiAppBar, IconButton, Toolbar, Typography, Button, Menu, MenuItem, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAtomValue } from 'jotai';
import { LoggedInAtom, userNameAtom } from '../../states/Credential/CredentialState';
import { AccountCircle } from '@mui/icons-material';
import React from 'react';

export default function AppBar() {

    const baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
    const authURL = `${baseUrl}/api/connect/keycloak`;
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isLoggedIn = useAtomValue(LoggedInAtom);
    const userName = useAtomValue(userNameAtom);
  
    const loginAndOut = () => {
        if (isLoggedIn) {
          localStorage.removeItem("jwt");
          location.href = location.href.replace(location.search, "");
        } else {
          location.href = authURL;
        }
      };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <MuiAppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    帳すごいメモ超
                </Typography>
                {isLoggedIn ? (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <Box sx={{ padding: "5px 15px 5px 15px"}}>
                                <Typography>{userName}</Typography>
                            </Box>
                            <Divider />
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={loginAndOut}>ログアウト</MenuItem>
                        </Menu>
                    </div>
                ) : <Button variant='contained' color='inherit' onClick={loginAndOut}>ログイン</Button>}
            </Toolbar>
        </MuiAppBar>
    );
}