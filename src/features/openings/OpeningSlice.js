import { createSlice } from '@reduxjs/toolkit';
import openingsData from './OpeningData'; 

const openingsSlice = createSlice({
  name: 'openings',
  initialState: {
    list: openingsData,
    selectedOpening: null,
  },
  reducers: {
    selectOpening: (state, action) => {
      const openingId = parseInt(action.payload);
      state.selectedOpening = state.list.find((opening) => opening.id === openingId);
    },
    addOpening: (state, action) => {
      const newOpening = {
        id: Date.now(),
        ...action.payload,
      };
      state.list.push(newOpening);
    },
  },
});

export const { selectOpening, addOpening } = openingsSlice.actions;
export default openingsSlice.reducer;

