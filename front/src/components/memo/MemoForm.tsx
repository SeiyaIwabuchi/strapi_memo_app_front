import React, { useState, FormEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface MemoFormProps {
  addMemo: (text: string) => void;
}

function MemoForm({ addMemo }: MemoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      addMemo(text);
      setText('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 2 }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="新しいメモ"
        variant="outlined"
        fullWidth
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">
        追加
      </Button>
    </Box>
  );
}

export default MemoForm;