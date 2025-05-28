import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import editPostCacheReducer from './editPostCacheSlice'
import recentNoteReducer from './recentNoteSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        editPostCache: editPostCacheReducer,
        recentNote: recentNoteReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
