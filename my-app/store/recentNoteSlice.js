import { createSlice } from '@reduxjs/toolkit';

const recentNoteSlice = createSlice({
  name: 'recentNote',
  initialState: {
    content: null,
  },
  reducers: {
    setRecentNote: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setRecentNote } = recentNoteSlice.actions;
export default recentNoteSlice.reducer;