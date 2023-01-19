
import { configureStore } from '@reduxjs/toolkit'
import { appApi } from '../api';
import userReducer from '../features/user.reducer';
import errorReducer from '../features/error.reducer';

export const store = configureStore({
    reducer: {
        userReducer,
        errorReducer,
        [appApi.reducerPath]: appApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(appApi.middleware),
    
  })


export type RootState = ReturnType<typeof store.getState>
  
  export type AppDispatch = typeof store.dispatch

  //@ts-ignore
export const apiUrl = import.meta.VITE_API_URL;

//@ts-ignore
window.store = store;