import { createSlice } from '@reduxjs/toolkit'

interface PostType {
    title: string;
    status: string;
    content: string;
    pathName: string;
}

interface EditPostCache {
    con: PostType
}

const initialState: EditPostCache = {
    con: {
        title: '',
        status: '',
        content: '',
        pathName: ''
    }
}

const editPostCacheSlice = createSlice({
    name: 'editPost',
    initialState,
    reducers: {
        updateEditPost: (state, action) => {
            state.con = action.payload
        },
        clearEditPost: (state) => {
            state.con = {
                title: '',
                status: '',
                content: '',
                pathName: ''
            }
        }
    }
})

export const {
    updateEditPost,
    clearEditPost
} = editPostCacheSlice.actions
export default editPostCacheSlice.reducer