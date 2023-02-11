import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import gameReducer from './gameSlice';
import handReducer from './handSlice';
import playerReducer from './playerSlice';
import roundReducer from './roundSlice';

const saveToSessionStorage = (state: any) => {
  try {
    sessionStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromSessionStorage = () => {
  try {
    const stateStr = sessionStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const rootReducer = combineReducers({
  game: gameReducer,
  hand: handReducer,
  player: playerReducer,
  round: roundReducer,
});

const persistedStore = loadFromSessionStorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedStore,
});

store.subscribe(() => {
  saveToSessionStorage(store.getState());
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>(); // Export a hook that can be reused to resolve types
