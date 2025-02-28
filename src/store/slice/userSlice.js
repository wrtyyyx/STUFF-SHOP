import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        img: '',
    },
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },

        resetUser: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.img = '';
            sessionStorage.removeItem('userData');
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
