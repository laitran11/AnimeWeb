import {configureStore} from '@reduxjs/toolkit';
import {animeApi} from '@api/animeApi';
import animeReducer from '@slices/animeSlice';
import {recommendApi} from '@api/recommendApi';

export const store = configureStore({
    reducer:{
        anime: animeReducer,
        [animeApi.reducerPath]: animeApi.reducer,
        [recommendApi.reducerPath]: recommendApi.reducer, 
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            animeApi.middleware, 
            recommendApi.middleware),
});