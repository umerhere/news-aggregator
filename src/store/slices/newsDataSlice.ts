import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../index';
import { CONSTANTS } from '../../core/constants';

// Existing Article type
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

// Define a new type for storing user preferences
type UserSettings = {
  preferredAuthor: string;
  preferredCategory: string;
  preferredSource: string;
};

// Extended state to also store user's preferences
type NewsDatasMapObject = {
  newsData: Array<Article> | null;
  filteredNewsData: Array<Article> | null;
  sources: Array<string>;
  userSettings: UserSettings | null;  // Added userSettings to the state
};

// Initialize the state with default user preferences
const initialState: NewsDatasMapObject = {
  newsData: null,
  filteredNewsData: null,
  sources: CONSTANTS.SOURCES,
  userSettings: {
    preferredAuthor: 'John Doe',  // Default author
    preferredCategory: 'Sports',  // Default category
    preferredSource: 'NewsAPI',   // Default source
  },
};

// Create the slice
const newsDataSlice = createSlice({
  name: 'newsData',
  initialState,
  reducers: {
    // Existing reducer to load articles
    _loadNewsData: (state, action: PayloadAction<Array<Article> | null>) => {
      state.newsData = action.payload;
    },
    // Existing reducer to load sources
    _loadSources: (state, action: PayloadAction<Array<string>>) => {
      state.sources = [...state.sources, ...action.payload];
    },
    // Existing reducer to set filtered articles
    _setFilteredNewsData: (state, action: PayloadAction<Array<Article> | null>) => {
      state.filteredNewsData = action.payload;
    },
    // New reducer to update user preferences
    _updateUserSettings: (state, action: PayloadAction<UserSettings>) => {
      state.userSettings = action.payload;
    },
  },
});

// Export the new action for updating user settings
export const { _loadNewsData, _setFilteredNewsData, _loadSources, _updateUserSettings } = newsDataSlice.actions;

// Thunk to load news data (same as before)
export const loadNewsData =
  (data: Array<Article> | null) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(_loadNewsData(data));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

// Thunk to load sources (same as before)
export const loadSources =
  (data: Array<string>) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(_loadSources(data));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

// Thunk to set filtered news data (same as before)
export const setFilteredNewsData =
  (data: Array<Article> | null) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(_setFilteredNewsData(data));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

// Thunk to update user preferences
export const updateUserSettings =
  (settings: UserSettings) =>
  (dispatch: AppDispatch) => {
    try {
      dispatch(_updateUserSettings(settings)); // Dispatch the action to store preferences
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

export default newsDataSlice.reducer;
