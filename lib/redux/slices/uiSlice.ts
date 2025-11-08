import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  topHeaderVisible: boolean;
}

const initialState: UIState = {
  topHeaderVisible: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTopHeaderVisible(state, action: PayloadAction<boolean>) {
      state.topHeaderVisible = action.payload;
    },
  },
});

export const { setTopHeaderVisible } = uiSlice.actions;
export default uiSlice.reducer;
