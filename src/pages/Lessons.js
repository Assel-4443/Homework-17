import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLessons } from "../api/api"; 

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("🔹 Загружаем уроки...");
      const data = await fetchLessons();
      console.log("✅ Полученные уроки:", data);

      if (data.length === 0) {
        throw new Error("Нет доступных уроков.");
      }

      setLessons(data);
    } catch (err) {
      console.error("❌ Ошибка загрузки:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Список уроков</h2>

      {loading && <p>Загрузка...</p>}

      {error ? (
        <p style={{ color: "red" }}>⚠ {error}</p>
      ) : (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link to={`/lessons/${lesson.id}`}>{lesson.title}</Link>
            </li>
          ))}
        </ul>
      )}

      <button onClick={loadLessons} disabled={loading}>
        🔄 Обновить список
      </button>
    </div>
  );
};

export default Lessons;
