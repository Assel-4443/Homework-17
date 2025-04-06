import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessonById, updateProgress } from "../api/api"; // ✅ Импорт API-функций

const userId = 1; // 🔹 Временно используем ID=1

const LessonDetail = () => {
  const { id } = useParams(); // Получаем ID урока из URL
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false); // 🔹 Состояние для завершённого урока

  useEffect(() => {
    const loadLesson = async () => {
      console.log("🔹 Загружаем урок...");
      const lessonData = await fetchLessonById(id);
      console.log("✅ Данные урока:", lessonData);
      setLesson(lessonData);
      setLoading(false);
    };

    loadLesson();
  }, [id]);

  const handleCompleteLesson = async () => {
    console.log(`🔹 Отправляем обновление прогресса для урока ${id}...`);
    await updateProgress(userId, { lessonId: id, completed: true });
    console.log("✅ Прогресс обновлён!");
    setCompleted(true); // ✅ Отмечаем урок завершённым
  };

  if (loading) return <p>Загрузка...</p>;
  if (!lesson) return <p>Урок не найден</p>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>

      {/* 🔹 Кнопка завершения урока */}
      {!completed ? (
        <button onClick={handleCompleteLesson}>✅ Завершить урок</button>
      ) : (
        <p>🎉 Урок завершён!</p>
      )}
    </div>
  );
};

export default LessonDetail;
