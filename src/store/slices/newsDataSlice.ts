import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../index';
import {CONSTANTS} from '../../core/constants'

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
  author: string;
};

type NewsDatasMapObject = {
  newsData: Array<Article> | null;
  filteredNewsData: Array<Article> | null;
  sources: Array<string>
  //workspaceTabIndex: number
};

type NewsDatasMapState = NewsDatasMapObject;

const initialState: NewsDatasMapState = {
  newsData: null,
  filteredNewsData: null,
  sources: CONSTANTS.SOURCES
  //workspaceTabIndex: 0,
};

const newsDataSlice = createSlice({
  name: 'newsData',
  initialState,
  reducers: {
    _loadNewsData: (state, action: PayloadAction<Array<Article> | null>) => {
      state.newsData = action.payload;
    },
    _loadSources: (state, action: PayloadAction<Array<string>>) => {
      state.sources = [...state.sources, ...action.payload];
    },
    _setFilteredNewsData: (state, action: PayloadAction<Array<Article> | null>) => {
      state.filteredNewsData = action.payload;
    },
  },
});

export const { _loadNewsData, _setFilteredNewsData, _loadSources } = newsDataSlice.actions;

export const loadNewsData =
  (data: Array<Article> | null) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(_loadNewsData(data));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };
  
export const loadSources =
  (data: Array<string>) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(_loadSources(data));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

export const setFilteredNewsData =
  (data: Array<Article> | null) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(_setFilteredNewsData(data));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

export default newsDataSlice.reducer;
