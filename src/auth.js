export const fakeBackend = {
    users: [], // Массив для хранения пользователей

    // Имитация регистрации
    registerUser: (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Проверяем, нет ли уже пользователя с таким email
                if (fakeBackend.users.find((user) => user.email === email)) {
                    reject("User with this email already exists"); // Если есть, отклоняем промис
                } else {
                    // Если нет, "регистрируем" пользователя
                    const newUser = { name, email, password };
                    fakeBackend.users.push(newUser);
                    resolve(newUser); // Разрешаем промис с данными нового пользователя
                }
            }, 1000); // Имитация задержки
        });
    },

    // Имитация входа
    loginUser: (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Ищем пользователя по username (пока считаем, что это email)
                const user = fakeBackend.users.find((user) => user.email === username);

                if (user && user.password === password) {
                    resolve(user); // Если нашли и пароль совпал, разрешаем промис
                } else {
                    reject("Invalid username or password"); // Если не нашли или пароль не совпал, отклоняем промис
                }
            }, 1000);
        });
    },
};