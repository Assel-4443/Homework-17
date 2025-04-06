import { Link } from "react-router-dom";
import { useContext } from "react";
import classNames from "classnames"; // ✅ Подключаем classNames
import { ThemeContext } from "../ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // ✅ Используем classNames для стилизации навбара
  const navClass = classNames("navbar", { dark: theme === "dark", light: theme === "light" });

  // ✅ Используем classNames для кнопки
  const buttonClass = classNames("theme-button", { dark: theme === "dark", light: theme === "light" });

  return (
    <nav className={navClass}>
      <ul>
        <li><Link to="/">🏠 Главная</Link></li>
        <li><Link to="/lessons">📚 Уроки</Link></li>
        <li><Link to="/profile">👤 Профиль</Link></li>
        <li><Link to="/achievements">🏆 Достижения</Link></li>
      </ul>

      {/* ✅ Кнопка переключения темы */}
      <div className="theme-switcher">
        <button className={buttonClass} onClick={toggleTheme}>
          Переключить тему ({theme === "dark" ? "Тёмная" : "Светлая"})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
