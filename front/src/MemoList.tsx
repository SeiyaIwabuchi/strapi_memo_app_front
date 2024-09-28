import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid2';

interface Memo {
  id: number;
  text: string;
}

interface MemoListProps {
  memos: Memo[];
  deleteMemo: (id: number) => void;
  editMemo: (memo: Memo) => void;
}

function MemoList({ memos, deleteMemo, editMemo }: MemoListProps) {
  return (
    <Grid container spacing={2}>
      {memos.map((memo) => (
        <Grid size={4} key={memo.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body1">{memo.text}</Typography>
              <IconButton aria-label="edit" onClick={() => editMemo(memo)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => deleteMemo(memo.id)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default MemoList;