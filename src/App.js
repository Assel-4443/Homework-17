import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Стили для уведомлений
import { ThemeContext } from "./ThemeContext"; // ✅ Импортируем контекст темы
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import Profile from "./pages/Profile";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import "./App.css"; // ✅ Подключаем стили

function App() {
  const themeContext = useContext(ThemeContext);

  // ✅ Защита от ошибок, если ThemeContext не загружен
  if (!themeContext) {
    return <p>Ошибка: ThemeContext не найден</p>;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div className={`app-container ${theme}`}> {/* ✅ Добавляем класс темы */}
      <Navbar />

      {/* ✅ Кнопка для переключения темы */}
      <div className="theme-switcher">
        <button onClick={toggleTheme} className="theme-button">
          Переключить на {theme === "light" ? "тёмную" : "светлую"} тему
        </button>
      </div>

      {/* ✅ Контейнер для уведомлений */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Маршруты */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:id" element={<LessonDetail />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
