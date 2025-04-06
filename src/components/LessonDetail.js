import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LessonDetail = () => {
  const { id } = useParams(); // Используем useParams() для получения id урока
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/lessons/${id}`)
      .then((response) => {
        setLesson(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка при загрузке урока");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!lesson) return <p>Урок не найден</p>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <button onClick={() => alert(`Урок "${lesson.title}" начат!`)}>Пройти урок</button>
    </div>
  );
};

export default LessonDetail;
