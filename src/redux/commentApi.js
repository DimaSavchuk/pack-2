import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://64674adeba7110b663b466b2.mockapi.io/";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getAllComents: builder.query({
      query: () => API_ENDPOINT,
      providesTags: ["Comments"],
    }),
    addNewComments: builder.mutation({
      query: (newComment) => ({
        url: API_ENDPOINT,
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `${API_ENDPOINT}/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (id) => {
        return {
          url: `${API_ENDPOINT}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetAllComentsQuery,
  useAddNewCommentsMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
