import React, { useEffect } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid2';
import { Memo } from "./entities/memo/response/Memo"


const style = {
  cursor: "pointer"
};

interface MemoListProps {
  memos: Memo[];
  deleteMemo: (memo: Memo) => void;
  editMemo: (memo: Memo) => void;
}

function MemoList({ memos, deleteMemo, editMemo }: MemoListProps) {
  return (
    <Grid container spacing={2}>
      {memos.map((memo) => (
        <Grid size={6} key={memo.id}>
          <Card variant="outlined" onClick={() => editMemo(memo)} sx={style}>
            <CardContent>
              <Typography variant="h6">{memo.Title.slice(0, 15)}</Typography>
              <Typography variant="body1">{memo.Body.slice(0, 100)}</Typography>
              <IconButton aria-label="delete" onClick={() => deleteMemo(memo)}>
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