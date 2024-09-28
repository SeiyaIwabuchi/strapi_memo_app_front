import React, { useState } from 'react';
import { Container, Typography, Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MemoList from './MemoList';
import AddMemoModal from './AddMemoModal';
import EditMemoModal from './EditMemoModal';

interface Memo {
  id: number;
  text: string;
}

function App() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);

  const addMemo = (text: string) => {
    setMemos([...memos, { id: Date.now(), text }]);
    setIsAddModalOpen(false);
  };

  const editMemo = (id: number, newText: string) => {
    setMemos(memos.map(memo => memo.id === id ? { ...memo, text: newText } : memo));
    setIsEditModalOpen(false);
    setEditingMemo(null);
  };

  const deleteMemo = (id: number) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  const openEditModal = (memo: Memo) => {
    setEditingMemo(memo);
    setIsEditModalOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          メモ帳アプリ
        </Typography>
        <MemoList memos={memos} deleteMemo={deleteMemo} editMemo={openEditModal} />
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