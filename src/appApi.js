// src/appApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./customBaseQuery";

// Создаем API-сервис с помощью createApi
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Tags"],
  endpoints: (builder) => ({
    // Получение тегов (GET запрос)
    getTags: builder.query({
      query: () => ({
        url: "/a_common/tags/talent",
        method: "GET",
      }),
      providesTags: ["Tags"],
    }),
    // Создание нового тега (POST запрос)
    createTag: builder.mutation({
      query: (tagName) => ({
        url: "/a_common/tags/talent",
        method: "POST",
        data: { tag: tagName }, // Передаем имя тега в ключе "tag"
      }),
      invalidatesTags: ["Tags"],
    }),
    // Удаление тега (DELETE запрос)
    deleteTag: builder.mutation({
      query: (tagId) => ({
        url: "/a_common/tags/talent",
        method: "DELETE",
        data: { id: tagId }, // Передаем ID в теле запроса
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useGetTagsQuery, useCreateTagMutation, useDeleteTagMutation } =
  appApi;
