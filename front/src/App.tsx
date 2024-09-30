import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MemoList from './MemoList';
import AddMemoModal from './AddMemoModal';
import EditMemoModal from './EditMemoModal';
import { Memo as MemoCreate } from "./entities/memo/request/Memo";
import { memoApi } from "./Providers";
import { Memos, Memo } from './entities/memo/response/Memo';


function App() {
  const [memos, setMemos] = useState<Memos>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);

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

  useEffect(() => {
    (async () => setMemos(await memoApi.getAll()))();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            メモ帳アプリ
          </Typography>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setIsAddModalOpen(true)}
            sx={{ margin: "0px 10px 10px 0px" }}
          >
            <AddIcon />
          </Fab>
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