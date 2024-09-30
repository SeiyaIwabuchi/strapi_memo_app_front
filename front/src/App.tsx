import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Fab, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MemoList from './MemoList';
import AddMemoModal from './AddMemoModal';
import EditMemoModal from './EditMemoModal';
import { Memo as MemoCreate } from "./entities/memo/request/Memo";
import { memoApi, userApi } from "./Providers";
import { Memos, Memo } from './entities/memo/response/Memo';
import axios, { AxiosError } from 'axios';

function App() {
  const baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
  const authURL = `${baseUrl}/api/connect/keycloak`;


  const [memos, setMemos] = useState<Memos>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");


  const addMemo = async (memo: MemoCreate) => {
    await memoApi.create({ Title: memo.Title, Body: memo.Body, Deleted_at: memo.Deleted_at });
    setMemos(await memoApi.getAll());
    setIsAddModalOpen(false);
  };

  const editMemo = async (id: string, newMemo: MemoCreate) => {
    await memoApi.update(id, { Title: newMemo.Title, Body: newMemo.Body, Deleted_at: newMemo.Deleted_at });
    setMemos(await memoApi.getAll());
    setIsEditModalOpen(false);
    setEditingMemo(null);
  };

  const deleteMemo = async (memo: Memo) => {
    await memoApi.remove(memo.documentId);
    setMemos(await memoApi.getAll());
  };

  const openEditModal = (memo: Memo) => {
    setEditingMemo(memo);
    setIsEditModalOpen(true);
  };

  const loginAndOut = () => {
    if (isLoggedIn) {
      localStorage.removeItem("jwt");
      location.href = location.href.replace(location.search, "");
    } else {
      location.href = authURL;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const auth = await userApi.getMyInfo();
        setMemos(await memoApi.getAll());
        setLoggedIn(true);
        setUserName(auth.username);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.status == 401) {
            if (location.search.indexOf("access_token") > 0){
              const auth = (await axios.get(`${import.meta.env.VITE_STRAPI_BASE_URL}/api/auth/keycloak/callback${location.search}`, { responseType: 'json' })).data;
              localStorage.setItem('jwt', auth.jwt);
              setLoggedIn(true);
              setUserName(auth.user.username);
              setMemos(await memoApi.getAll());
            }
          } else {
            throw err;
          }
        }
      }
    })();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            メモ帳アプリ
          </Typography>
          <Box sx={{display: "flex"}}>
            <Typography variant='h6'>{userName}</Typography>
            <Button variant='contained' sx={{ marginRight: "10px" }} href={"#"} onClick={() => loginAndOut()}>{ isLoggedIn ? "ログアウト" : "ログイン" }</Button>
          </Box>
        </Box>
        {memos ? <MemoList memos={memos.data.filter(memo => memo.Deleted_at == null)} deleteMemo={deleteMemo} editMemo={openEditModal} /> : <></>}
        <AddMemoModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} addMemo={addMemo} />
        <EditMemoModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          editMemo={editMemo}
          memo={editingMemo}
        />
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

export default App;