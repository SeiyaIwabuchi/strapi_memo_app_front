import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { IMemo as MemoCreate } from "../../entities/memo/request/IMemo";
import { memoApi } from '../../providers/Providers';
import { useAtom, useSetAtom } from 'jotai';
import { memoListAtom } from '../../states/Memo/MemoListState';
import { isOpenAddMomeModal } from '../../states/Memo/AddMemoModalState';

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

function AddMemoModal() {

  const setMemos = useSetAtom(memoListAtom);
  const [isAddModelOpen, setIsAddModalOpen] = useAtom(isOpenAddMomeModal);

  const addMemo = async (memo: MemoCreate) => {
    await memoApi.create({ Title: memo.Title, Body: memo.Body, Deleted_at: memo.Deleted_at });
    setMemos(await memoApi.getAll());
    setIsAddModalOpen(false);
  };

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
    <Modal open={isAddModelOpen} onClose={() => setIsAddModalOpen(false)}>
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