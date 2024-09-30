import React, { useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid2';
import { Memo } from "./entities/memo/response/Memo"



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
          <Card variant="outlined" onClick={() => editMemo(memo)} sx={{ cursor: "pointer", boxShadow: "3px 3px 10px gray" }}>
            <CardContent>
              <Typography variant="h6">{memo.Title.slice(0, 15)}</Typography>
              <Typography variant="body1">{memo.Body.slice(0, 100)}</Typography>
              <CardActions disableSpacing>
                <IconButton aria-label="delete" onClick={() => deleteMemo(memo)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default MemoList;