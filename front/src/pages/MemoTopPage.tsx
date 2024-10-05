import { Container, Typography, Box, Fab, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MemoList from '../components/memo/MemoList';
import AddMemoModal from '../components/memo/AddMemoModal';
import EditMemoModal from '../components/memo/EditMemoModal';
import { useAtom, useSetAtom } from 'jotai';
import snackbarStateAtom from '../states/SnackbarStateAtom';
import { memoListAtom } from '../states/Memo/MemoListState';
import { edittingMemoAtom, isEditModalOpenAtom } from '../states/Memo/EditMemoStateState';
import { LoggedInAtom, userNameAtom } from '../states/Credential/CredentialState';
import { isOpenAddMomeModal } from '../states/Memo/AddMemoModalState';
import { useEffect } from 'react';

function MemoTopPage() {
  const baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
  const authURL = `${baseUrl}/api/connect/keycloak`;

  // jotai
  const [snackbarState, setSnackbarState] = useAtom(snackbarStateAtom);
  const setEdittingMemo = useSetAtom(edittingMemoAtom);
  const setIsEditModalOpen = useSetAtom(isEditModalOpenAtom);
  const [isLoggedIn, setLoggedIn] = useAtom(LoggedInAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  const setMemos = useSetAtom(memoListAtom);
  const setIsAddModalOpen = useSetAtom(isOpenAddMomeModal);


  const loginAndOut = () => {
    if (isLoggedIn) {
      localStorage.removeItem("jwt");
      location.href = location.href.replace(location.search, "");
    } else {
      location.href = authURL;
    }
  };

  // useEffect(() => { console.log(location.href); });

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            メモ一覧
          </Typography>
        </Box>
        <MemoList />
        <AddMemoModal/>
        <EditMemoModal/>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setIsAddModalOpen(true)}
        sx={{ position: 'fixed', bottom: 16, right: 16 }} // Adjusted position
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default MemoTopPage;