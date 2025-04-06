import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Компонент для отображения списка уроков
const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Загружаем уроки
    axios
      .get("http://localhost:5000/api/lessons")
      .then((response) => {
        setLessons(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке уроков");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Список уроков</h2>

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Компонент для отображения информации о конкретном уроке
const LessonDetail = ({ match }) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lessonId = match.params.id;

    // Загружаем конкретный урок
    axios
      .get(`http://localhost:5000/api/lessons/${lessonId}`)
      .then((response) => {
        setLesson(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке урока");
        setLoading(false);
      });
  }, [match.params.id]);

  return (
    <div>
      <h2>Информация об уроке</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && lesson && (
        <div>
          <h3>{lesson.title}</h3>
          <p>{lesson.description}</p>
        </div>
      )}
    </div>
  );
};

// Главный компонент 
const App = () => {
  return (
    <Router>
      <div>
        <h1>Изучение языка</h1>
        <nav>
          <Link to="/">Главная</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Lessons} />
          <Route path="/lesson/:id" component={LessonDetail} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
