/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  configureStore,
  createAction,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Middleware } from 'redux';

// Reducers
import newsDataSlice from './slices/newsDataSlice';
import settingsSlice from './slices/settingsSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Combine all reducers
const reducer = combineReducers({
  newsDataSlice,
  settingsSlice
});

// Global state reset action called on clearUser
export const resetAction = createAction('reset');

// Global state reset reducer
const resettableReducer = (state: any, action: any) => {
  if (resetAction.match(action)) {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, resettableReducer);

// Define an array of middleware
const middleware: Middleware[] = [
  // Add more middleware if needed
];

// Ignore all the action types from redux-persist as specified in the docs
export const store = configureStore({
  reducer: persistedReducer,
  // middleware,
  devTools: process.env.NODE_ENV !== 'production',
  // enhancers: [],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/**
 * Clear user redux store if user leaves trip page
 * as a tentative user.
 */
export const resetUserStore = (dispatch: AppDispatch, dropCookies = true) => {
  if (dropCookies) dispatch(resetAction());
  // Dispatch other clear actions if needed
};
