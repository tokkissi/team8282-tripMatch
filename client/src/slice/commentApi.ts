import { createApi } from "@reduxjs/toolkit/query/react";
import type { CommentType } from "../type/comment";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["Comment"],
  baseQuery: axiosBaseQuery({
    baseUrl: "http://34.64.156.80:3003/api/",
  }),
  endpoints: (builder) => ({
    // id에 해당하는 댓글을 업데이트
    updateComment: builder.mutation<
      CommentType,
      { commentId: string; content: string }
    >({
      query: ({ commentId, ...content }) => ({
        url: `main/comment/${commentId}`,
        method: "PUT",
        data: content,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.commentId },
      ],
    }),
    // 댓글 추가
    createComment: builder.mutation<
      null,
      { content: string; communityId?: string; postId?: string }
    >({
      query: (newComment) => ({
        url: "main/comment",
        method: "POST",
        data: newComment, // body:{content:string,(communityId || postId):string}
      }),
      invalidatesTags: ["Comment"],
    }),
    // id에 해당하는 댓글 삭제
    deleteComment: builder.mutation<null, string>({
      query: (commentId) => ({
        url: `main/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
