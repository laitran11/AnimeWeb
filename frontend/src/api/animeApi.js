import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Config } from '../Config';

export const animeApi = createApi({
    reducerPath: 'animeApi',
    baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
    endpoints:(builder) => ({
        getAnimeList : builder.query({
            query:() => 'anime',
        }),
        getAnimeById : builder.query({
            query:(id) => `anime/${id}`,
        }),
        getAllAnime: builder.query({
            query:() => 'anime/all',
        })
    })
});

export const {
    useGetAnimeListQuery,
    useGetAnimeByIdQuery,
    useGetAllAnimeQuery,
} = animeApi;