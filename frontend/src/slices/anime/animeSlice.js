import { createSlice } from '@reduxjs/toolkit';

const animeSlice = createSlice({
    name: 'anime',
    initialState:{
        selectedId : null,
    },
    reducers:{
        setSelectedId: (state, action) => {
            state.selectedId = action.payload;
        },
        clearSelectedId: (state) => {
            state.selectedId = null;
        }
    }
})

export const {setSelectedId, clearSelectedId} = animeSlice.actions;
export default animeSlice.reducer;