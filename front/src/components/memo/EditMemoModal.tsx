import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { IMemo as MemoCreate } from "../../entities/memo/request/IMemo";
import { Memo } from "../../entities/memo/response/Memo";
import { memoApi } from '../../providers/Providers';
import { useAtom, useSetAtom } from 'jotai';
import { memoListAtom } from '../../states/Memo/MemoListState';
import { edittingMemoAtom, isEditModalOpenAtom } from '../../states/Memo/EditMemoStateState';


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

function EditMemoModal() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [open, setIsEditModalOpen] = useAtom(isEditModalOpenAtom);
  const [memo, setEditingMemo] = useAtom(edittingMemoAtom);

  const setMemos = useSetAtom(memoListAtom);

  const editMemo = async (id: string, newMemo: MemoCreate) => {
    await memoApi.update(id, { Title: newMemo.Title, Body: newMemo.Body, Deleted_at: newMemo.Deleted_at });
    setMemos(await memoApi.getAll());
    setIsEditModalOpen(false);
    setEditingMemo(null);
  };

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
    <Modal open={open} onClose={() => setIsEditModalOpen(false)}>
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