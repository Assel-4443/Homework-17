import React, { useEffect, useState } from "react";
import { fetchProgress, fetchLessons, fetchAchievements, addAchievement } from "../api/api";

const userId = 1; // 🔹 Временно используем ID=1

const Profile = () => {
  const [progress, setProgress] = useState([]); // Завершённые уроки
  const [lessons, setLessons] = useState([]); // Все уроки
  const [achievements, setAchievements] = useState([]); // Полученные награды
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const userProgress = await fetchProgress(userId);
      const allLessons = await fetchLessons();
      const userAchievements = await fetchAchievements(userId);

      setProgress(userProgress?.completedLessons || []);
      setLessons(allLessons);
      setAchievements(userAchievements);

      checkAchievements(userProgress?.completedLessons || [], userAchievements);
      setLoading(false);
    };

    loadData();
  }, []);

  // Проверка достижений
  const checkAchievements = async (completedLessons, userAchievements) => {
    const newAchievements = [];

    if (completedLessons.length >= 1 && !userAchievements.some(a => a.id === 1)) {
      newAchievements.push(1); // "Первый шаг"
    }
    if (completedLessons.length >= 5 && !userAchievements.some(a => a.id === 2)) {
      newAchievements.push(2); // "Учёный"
    }
    if (completedLessons.length >= 10 && !userAchievements.some(a => a.id === 3)) {
      newAchievements.push(3); // "Полиглот"
    }

    // Добавляем новые достижения
    for (const achievementId of newAchievements) {
      await addAchievement(userId, achievementId);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>👤 Профиль</h2>

      <h3>📚 Завершённые уроки:</h3>
      {progress.length > 0 ? (
        <ul>
          {progress.map((lessonId) => {
            const lesson = lessons.find((l) => l.id === lessonId);
            return lesson ? <li key={lesson.id}>{lesson.title}</li> : null;
          })}
        </ul>
      ) : (
        <p>Пока нет завершённых уроков.</p>
      )}

      <h3>🏆 Достижения:</h3>
      {achievements.length > 0 ? (
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.id}>🏅 {achievement.title}</li>
          ))}
        </ul>
      ) : (
        <p>Пока нет достижений.</p>
      )}
    </div>
  );
};

export default Profile;
