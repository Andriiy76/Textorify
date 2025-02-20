// backend/src/server.js
import 'dotenv/config'; //  Загружаем переменные окружения
import app from './app.js'; //  Импортируем app

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});