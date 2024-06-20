// src/common/Pagination/Pagination.js
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ page, count, onChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        size='large'
      />
    </Stack>
  );
};

export default CustomPagination;
