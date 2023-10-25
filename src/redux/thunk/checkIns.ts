import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AirtableImage } from '../../shared/models/AirtableImage';
import { AirtableVideo } from '../../shared/models/AirtableVideo';

// This action is what we will call using the dispatch in order to trigger the API call.
export const getCheckIns = createAsyncThunk(
  '/api/Activity',
  async (data: { username: string; currentTab: string }) => {
    const response = await axios.get('/api/Activity', {
      params: {
        username: data.username,
        duration: data.currentTab,
      },
    });
    return response.data;
  },
);

export const updateCheckIns = createAsyncThunk(
  '/api/Activity/update',
  async (data: {
    id: string;
    noteText?: string;
    imagesArray?: AirtableImage[];
    videosArray?: AirtableVideo[];
  }) => {
    const response = await axios.put('/api/Activity/update', {
      id: data.id,
      fields: {
        ...(data?.noteText && { Notes: data?.noteText }),
        ...(data?.imagesArray && {
          Images: data?.imagesArray.map((image) => ({ url: image.url })),
        }),
        ...(data?.videosArray && {
          Videos: data?.videosArray.map((video) => ({ url: video.url })),
        }),
      },
    });
    return response.data;
  },
);
