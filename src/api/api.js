import axios from "axios";

const API_URL = "https://express-server-pcab.onrender.com";  
; 

// Получить список уроков
export const fetchLessons = async () => {
  try {
    console.log("🔹 Отправляем запрос на сервер...");

    const response = await axios.get(`${API_URL}/api/lessons`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Полный ответ сервера:", response);
    console.log("✅ Получены уроки:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при загрузке уроков:", error.message);
    
    if (error.response) {
      console.error("❌ Детали ошибки:", error.response.status, error.response.data);
    }

    return [];
  }
};

// Получить один урок по ID
export const fetchLessonById = async (lessonId) => {
  try {
    console.log(`🔹 Запрос урока ID=${lessonId}...`);
    const response = await axios.get(`${API_URL}/api/lessons/${lessonId}`);
    console.log("✅ Урок загружен:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Ошибка при загрузке урока ${lessonId}:`, error);
    return null;
  }
};

// Получить прогресс пользователя
export const fetchProgress = async (userId) => {
  try {
    console.log(`🔹 Запрос прогресса пользователя ID=${userId}...`);
    const response = await axios.get(`${API_URL}/api/progress/${userId}`);
    console.log("✅ Прогресс загружен:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при загрузке прогресса:", error);
    return null;
  }
};

// Обновить прогресс пользователя
export const updateProgress = async (userId, progressData) => {
  try {
    console.log(`🔹 Обновление прогресса пользователя ID=${userId}...`, progressData);
    const response = await axios.patch(`${API_URL}/api/progress/${userId}`, progressData);
    console.log("✅ Прогресс обновлен:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при обновлении прогресса:", error);
    return null;
  }
};

// Получить достижения пользователя
export const fetchAchievements = async (userId) => {
  try {
    console.log(`🔹 Запрос достижений пользователя ID=${userId}...`);
    const response = await axios.get(`${API_URL}/api/achievements/${userId}`);
    console.log("✅ Достижения загружены:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при загрузке достижений:", error);
    return [];
  }
};

// Добавить достижение пользователю
export const addAchievement = async (userId, achievementId) => {
  try {
    await axios.post(`${API_URL}/api/achievements/${userId}`, { achievementId });
    console.log(`🏅 Достижение ${achievementId} добавлено пользователю ${userId}`);
  } catch (error) {
    console.error("Ошибка при добавлении достижения:", error);
  }
};

// Получить список всех достижений
export const fetchAllAchievements = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/achievements`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке списка достижений:", error);
    return [];
  }
};
