// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface PaginationState {
//     currentPage: number;
//     totalPages: number;
//     itemsPerPage: number;
//     totalItems: number;
//     data: any[];
// }

// const initialState: PaginationState = {
//     currentPage: 1,
//     totalPages: 1,
//     itemsPerPage: 10,
//     totalItems: 0,
//     data: []
// }

// const paginationSlice = createSlice({
    
// })

// store/paginationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 5, // 可通过接口设置或 props 控制
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    nextPage(state) {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    prevPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const { setCurrentPage, nextPage, prevPage, setTotalPages } = paginationSlice.actions;
export default paginationSlice.reducer;