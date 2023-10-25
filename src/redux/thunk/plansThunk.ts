import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPlanCategories = createAsyncThunk(
  '/api/Plans/categories',
  async () => {
    const response = await axios('/api/Plans/categories');
    return response.data;
  },
);
