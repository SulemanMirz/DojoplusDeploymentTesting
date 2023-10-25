/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SchoolRating } from '../../shared/models/school.model';
import { useAppSelector } from '../hooks';
import type { RootState } from '../store';

export type CheckInsState = {
  data: { slug: string; reviewData: SchoolRating[] }[];
  loading: boolean;
  error: boolean;
};

const initialState: CheckInsState = {
  data: [],
  loading: false,
  error: false,
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviewData: (
      state,
      action: PayloadAction<{
        slug: string;
        data: SchoolRating[];
      }>,
    ) => {
      const index = state.data.findIndex(
        (data) => data.slug === action.payload.slug,
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          reviewData: [...action.payload.data],
        };
        return;
      }
      state.data = [
        ...state.data,
        { slug: action.payload.slug, reviewData: [...action.payload.data] },
      ];
    },
  },
  extraReducers: () => {},
});

export const { setReviewData } = reviewSlice.actions;

export const useSchoolReview = (
  slug: string,
): { slug: string; reviewData: SchoolRating[] } => {
  return useAppSelector((state: RootState) => {
    return state.review.data.find((review) => review.slug === slug);
  });
};

export default reviewSlice.reducer;
