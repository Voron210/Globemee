// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "./appApi"; // Импортируйте ваш API-сервис

// Настройка хранилища Redux
const store = configureStore({
  reducer: {
    // Добавляем редьюсер API
    [appApi.reducerPath]: appApi.reducer,
  },
  // Добавляем middleware для обработки запросов и кэширования
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export default store;
