import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Memo as MemoCreate } from "./entities/memo/request/Memo";

interface AddMemoModalProps {
  open: boolean;
  onClose: () => void;
  addMemo: (memo: MemoCreate) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function AddMemoModal({ open, onClose, addMemo }: AddMemoModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addMemo({ Title: title, Body: body, Deleted_at: null});
      setTitle('');
      setBody('');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          新しいメモを追加
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField
            fullWidth
            multiline
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力してください"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="メモを入力してください"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            追加
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default AddMemoModal;