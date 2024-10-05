import { Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';
import { Memo } from "../../entities/memo/response/Memo"
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { memoListAtom } from '../../states/Memo/MemoListState';
import { memoApi } from '../../providers/Providers';
import { edittingMemoAtom, isEditModalOpenAtom } from '../../states/Memo/EditMemoStateState';
import { useEffect } from 'react';
import { LoggedInAtom } from '../../states/Credential/CredentialState';
import snackbarStateAtom from '../../states/SnackbarStateAtom';

function MemoList() {

  const [memos, setMemos] = useAtom(memoListAtom);
  const setEdittingMemo = useSetAtom(edittingMemoAtom);
  const setIsEditModalOpen = useSetAtom(isEditModalOpenAtom);
  const loggedIn = useAtomValue(LoggedInAtom);
  const setSnackbarState = useSetAtom(snackbarStateAtom);

  const deleteMemo = async (memo: Memo) => {
    await memoApi.remove(memo.documentId);
    setMemos(await memoApi.getAll());
  };

  const openEditModal = (memo: Memo) => {
    setEdittingMemo(memo);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    ( async () => {
      if (loggedIn) {
        setMemos(await memoApi.getAll());
      } else {
        setSnackbarState({ isShow:true, message: "ログインしてください。" });
      }
      
      })();
  }, []);

  return (
    <Grid container spacing={2} sx={{ display: memos.data.length == 0 ? "none" : "flex" }}>
      {memos.data.map((memo) => (
        <Grid size={6} key={memo.id}>
          <Card variant="outlined" onClick={() => openEditModal(memo)} sx={{ cursor: "pointer", boxShadow: "3px 3px 10px gray" }}>
            <CardContent>
              <Typography variant="h6">{memo.Title.slice(0, 15)}</Typography>
              <Typography variant="body1">{memo.Body.slice(0, 100)}</Typography>
              <CardActions disableSpacing>
                <IconButton aria-label="delete" onClick={() => deleteMemo(memo)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default MemoList;