import React, { forwardRef, useImperativeHandle } from "react";
import confetti from "canvas-confetti";

const Confetti = forwardRef((props, ref) => {
  const handleConfetti = () => {
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Все цвета радуги
    const rainbowColors = [
      "#ff0000", // Красный
      "#ff7f00", // Оранжевый
      "#ffff00", // Желтый
      "#00ff00", // Зеленый
      "#0000ff", // Синий
      "#4b0082", // Индиго
      "#8b00ff", // Фиолетовый
    ];

    // Первый выстрел: вверх под углом 45 градусов с случайной высотой
    confetti({
      angle: 45,
      spread: 70,
      startVelocity: 75,
      particleCount: 200,
      origin: { x: 0.5, y: randomInRange(0.6, 0.9) }, // Случайная высота
      gravity: 0.6,
      scalar: 1.5, // Увеличенные частицы
      colors: rainbowColors, // Все цвета радуги
    });

    // Второй выстрел: вниз под углом 135 градусов с случайной высотой
    confetti({
      angle: 135,
      spread: 70,
      startVelocity: 75,
      particleCount: 200,
      origin: { x: 0.5, y: randomInRange(0.6, 0.9) }, // Случайная высота
      gravity: 0.6,
      scalar: 1.5, // Увеличенные частицы
      colors: rainbowColors, // Все цвета радуги
    });
  };

  // Используем useImperativeHandle для передачи функции наружу
  useImperativeHandle(ref, () => ({
    fire: handleConfetti,
  }));

  return null; // Ничего не рендерим
});
export default Confetti;
