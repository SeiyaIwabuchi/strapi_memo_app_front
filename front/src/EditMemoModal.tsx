import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface EditMemoModalProps {
  open: boolean;
  onClose: () => void;
  editMemo: (id: number, text: string) => void;
  memo: { id: number; text: string } | null;
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

function EditMemoModal({ open, onClose, editMemo, memo }: EditMemoModalProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (memo) {
      setText(memo.text);
    }
  }, [memo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && memo) {
      editMemo(memo.id, text);
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
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
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