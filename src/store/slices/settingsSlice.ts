import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSettings {
  preferredAuthor: string;
  preferredCategory: string;
  preferredSource: string;
}

const initialState: UserSettings = {
  preferredAuthor: 'Any famous author',
  preferredCategory: 'Sports',
  preferredSource: 'NewsAPI',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateUserSettings: (state, action: PayloadAction<UserSettings>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUserSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
