import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config } from '../Config';
export const recommendApi = createApi({
  reducerPath: 'recommendApi',
  baseQuery: fetchBaseQuery({ baseUrl: Config.RS_API}),
  endpoints: (builder) => ({
    postRecommend: builder.mutation({
      query: (data) => ({
        url: 'recommend',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePostRecommendMutation } = recommendApi;
