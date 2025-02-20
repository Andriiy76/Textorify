--  ВНИМАНИЕ!  ЭТО УДАЛИТ ВСЕ ДАННЫЕ ИЗ ТАБЛИЦЫ USERS!
--  Сделайте резервную копию, если у вас есть важные данные!

PRAGMA foreign_keys=off; --  Отключаем foreign keys (если они есть)

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS users_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_email_verified BOOLEAN NOT NULL DEFAULT 0,
  email_verification_token TEXT,
  email_verification_token_expires_at INTEGER,
  plan_id INTEGER REFERENCES plans(id)
);

--  Если у вас были данные в таблице users, перенесите их в users_new (кроме столбца name):
-- INSERT INTO users_new (id, email, password) SELECT id, email, password FROM users;

DROP TABLE users;

ALTER TABLE users_new RENAME TO users;

CREATE TABLE plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  price_monthly REAL,
  max_requests_per_month INTEGER,
  can_generate_images BOOLEAN DEFAULT 0,
  can_generate_audio BOOLEAN DEFAULT 0,
  can_use_custom_models BOOLEAN DEFAULT 0
);
--  Добавьте базовые тарифные планы (по желанию)
INSERT INTO plans (name, description, price_monthly, max_requests_per_month)
VALUES
    ('free', 'Free plan', 0.00, 100),
    ('basic', 'Basic plan', 10.00, 1000),
    ('pro', 'Pro plan', 30.00, 10000);
COMMIT;

PRAGMA foreign_keys=on; --  Включаем foreign keys обратно