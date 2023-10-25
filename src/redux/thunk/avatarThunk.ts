import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// This action is what we will call using the dispatch in order to trigger the API call.
export const getAvatar = createAsyncThunk(
  `/api/User?usersFields=${['Photo', 'Username']}`,
  async (username: string) => {
    const response = await axios(
      `/api/User?usersFields=${['Photo', 'Username']}`,
      {
        params: {
          username,
          detailUser: true,
        },
      },
    );
    return response.data;
  },
);
