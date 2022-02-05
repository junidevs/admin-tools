import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store'


export type pathValue = {
    logged: boolean;
};

const initialState: pathValue = {
    logged: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, { payload } : PayloadAction<boolean>) => {
            state.logged = payload;
        },
    },
});

export const { updateUser } = userSlice.actions;
export const userReader = (state: RootState) => state.userSlice.logged;
export default userSlice.reducer;