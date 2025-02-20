// backend/src/models/userModel.js
const findUserByEmail = async (db, email) => {
  try {
    return await db.get('SELECT * FROM users WHERE email = ?', [email]);
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
};

//  Убираем findUserById (он нам пока не нужен, но может понадобиться позже)
const findUserById = async (db, id) => {
    try {
        return await db.get('SELECT id, email, is_email_verified FROM users WHERE id = ?', [id]); //  Выбираем нужные поля
    } catch (error) {
        console.error("Error in findUserById:", error);
        throw error;
    }
};

const createUser = async (db, email, password) => {
  try {
    const result = await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    return result.lastID;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

//  Добавляем функции для email verification:
const setEmailVerificationToken = async (db, userId, token, expiresAt) => {
    try {
        await db.run('UPDATE users SET email_verification_token = ?, email_verification_token_expires_at = ? WHERE id = ?', [token, expiresAt, userId]);
    } catch (error) {
        console.error("Error in setEmailVerificationToken:", error);
        throw error;
    }
};
const findUserByVerificationToken = async (db, token) => {
  try {
    return await db.get('SELECT * FROM users WHERE email_verification_token = ? AND email_verification_token_expires_at > ?', [token, Date.now()]);
  } catch (error) {
    console.error("Error in findUserByVerificationToken:", error);
    throw error;
  }
};

const verifyEmail = async (db, userId) => {
    try {
        await db.run('UPDATE users SET is_email_verified = 1, email_verification_token = NULL, email_verification_token_expires_at = NULL WHERE id = ?', [userId]);
    } catch (error) {
        console.error("Error in verifyEmail:", error);
        throw error;
    }
};

const updateUser = async (db, userId, updates) => { // Добавим
    try {
        const keys = Object.keys(updates);
        const values = Object.values(updates);
        const setClause = keys.map(key => `${key} = ?`).join(', ');

        const result = await db.run(`UPDATE users SET ${setClause} WHERE id = ?`, [...values, userId]);
        return result.changes; //  Возвращаем количество измененных строк
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    }
};

export { findUserByEmail, findUserById, createUser, setEmailVerificationToken, findUserByVerificationToken, verifyEmail, updateUser };