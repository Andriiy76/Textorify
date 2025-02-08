import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "../styles/components/LoginForm.scss";
import { fakeBackend } from '../auth';
import { useAuth } from '../context/AuthContext';  //  Импортируем  useAuth

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();  //  Используем  useAuth  для доступа к  login

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
        setErrors({
            ...errors,
            [e.target.name]: null,
        });
        }
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.username) {
        newErrors.username = "Username is required";
        }

        if (!formData.password) {
        newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
        setIsSubmitting(true);

        fakeBackend
            .loginUser(formData.username, formData.password)
            .then((user) => {
            console.log("User logged in:", user);
            // alert("Login successful!"); //  Убираем  alert
            setFormData({  //очистка формы
                username: "",
                password: "",
              });
            login(user);       //  Вызываем  login  из  контекста
            navigate('/');       //  Редирект на главную
            })
            .catch((error) => {
            console.error("Login error:", error);
            alert(`Login failed: ${error}`);
            })
            .finally(() => {
            setIsSubmitting(false);
            });
        }
    };

    return (
        <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                {errors.username && (
                    <p className="error-message">{errors.username}</p>
                )}
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && (
                    <p className="error-message">{errors.password}</p>
                )}
                </div>
                <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Logging In..." : "Login"}
                </button>
            </form>
            </div>
        </motion.div>
    );
};

export default LoginForm;