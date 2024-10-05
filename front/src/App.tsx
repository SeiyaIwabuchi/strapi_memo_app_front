import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import React from 'react';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAtom } from 'jotai';
import snackbarStateAtom from './states/SnackbarStateAtom';
import AppBar from './components/common/AppBar';

function App() {

  const [snackbarState, setSnackbarState] = useAtom(snackbarStateAtom);

  return (
    <>
      <AppBar />
      <RouterProvider router={router} />
      <Snackbar
        open={snackbarState.isShow}
        autoHideDuration={6000}
        onClose={() => setSnackbarState({ ...snackbarState, isShow: false })}
        message={snackbarState.message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarState({ ...snackbarState, isShow: false })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default App;