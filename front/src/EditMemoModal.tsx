import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Memo as MemoCreate } from "./entities/memo/request/Memo";
import { Memo } from "./entities/memo/response/Memo";


interface EditMemoModalProps {
  open: boolean;
  onClose: () => void;
  editMemo: (id: string, newMemo: MemoCreate) => void;
  memo: Memo;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  height: "80vh",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function EditMemoModal({ open, onClose, editMemo, memo }: EditMemoModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (memo) {
      setTitle(memo.Title);
      setBody(memo.Body);
    }
  }, [memo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && memo) {
      editMemo(memo.documentId, { Title: title, Body: body, Deleted_at: null });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          メモを編集
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
            rows={25}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="メモを入力してください"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            更新
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default EditMemoModal;