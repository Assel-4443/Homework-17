import React, { useEffect, useState } from "react";
import { fetchAchievements } from "../api/api";
import { toast } from "react-toastify";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());

  useEffect(() => {
    const loadAchievements = async () => {
      const data = await fetchAchievements(1); // 1 - временный userId
      setAchievements(data);

      data.forEach((achievement) => {
        if (!unlockedAchievements.has(achievement.id)) {
          toast.success(`🎉 Поздравляем! Вы разблокировали: ${achievement.name}`);
          setUnlockedAchievements((prev) => new Set(prev).add(achievement.id));
        }
      });
    };

    loadAchievements();
  }, []);

  return (
    <div>
      <h2>Достижения</h2>
      <ul>
        {achievements.map((ach) => (
          <li key={ach.id}>
            <strong>{ach.name}</strong> — {ach.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
