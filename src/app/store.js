import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice';
import selectIdReducer from '../features/selectIdSlice';
import selectMajorReducer from '../features/selectMajorSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  login: loginReducer,
  selectId: selectIdReducer,
  selectMajor: selectMajorReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
