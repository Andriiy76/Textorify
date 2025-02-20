--  Откат миграции:
--  1. Удаление таблицы plans.
--  2. Возвращение старой структуры таблицы users (без email verification и plan_id).

PRAGMA foreign_keys=off; -- Отключаем проверку внешних ключей

BEGIN TRANSACTION;

-- Создаем временную таблицу users_old со старой структурой
CREATE TABLE IF NOT EXISTS users_old (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
  -- name убрали
);

-- Копируем данные из users в users_old (только нужные столбцы)
INSERT INTO users_old (id, email, password)
SELECT id, email, password
FROM users;

-- Удаляем таблицу users
DROP TABLE users;

-- Переименовываем users_old в users
ALTER TABLE users_old RENAME TO users;

-- Удаляем таблицу plans
DROP TABLE IF EXISTS plans;

COMMIT;

PRAGMA foreign_keys=on; -- Включаем проверку внешних ключей обратно