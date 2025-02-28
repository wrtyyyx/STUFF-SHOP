import { configureStore } from '@reduxjs/toolkit';
import { itemsApi } from './api/itemsApi.js';
import storeReducer from './slice/storeSlice.js';
import userReducer from './slice/userSlice.js';

const store = configureStore({
    reducer: {
        store: storeReducer,
        user: userReducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware),
});

export default store;
