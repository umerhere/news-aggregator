import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../index';

export type Article = {
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
};

type NewsDatasMapObject = {
  newsData: Array<Article> | null;
  filteredNewsData: Array<Article> | null;
  //workspaceTabIndex: number
};

type NewsDatasMapState = NewsDatasMapObject;

const initialState: NewsDatasMapState = {
  newsData: null,
  filteredNewsData: null,
  //workspaceTabIndex: 0,
};

const newsDataSlice = createSlice({
  name: 'newsData',
  initialState,
  reducers: {
    loadNewsData: (state, action: PayloadAction<Array<Article> | null>) => {
      state.newsData = action.payload;
    },
    setFilteredNewsData: (state, action: PayloadAction<Array<Article> | null>) => {
      state.filteredNewsData = action.payload;
    },
  },
});

export const { loadNewsData, setFilteredNewsData } = newsDataSlice.actions;

export const loadNewsDatas =
  (data: Array<Article> | null) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(loadNewsData(data));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

export const setFilteredNewsDatas =
  (data: Array<Article> | null) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(setFilteredNewsData(data));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

export default newsDataSlice.reducer;
