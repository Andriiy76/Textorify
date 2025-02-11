import React, { useState } from "react";
//import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "../styles/components/LoginForm.scss";
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'https://orange-engine-jj7g57j94xqw3j6gr-5000.app.github.dev/api/auth'; //  НОВЫЙ URL!

const LoginForm = () => {
    const [formData, setFormData] = useState({
        loginIdentifier: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

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

        if (!formData.loginIdentifier) {
          newErrors.loginIdentifier = "Email or Name is required";
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
            console.log("login data for submit", formData)
            fetch(`${API_BASE_URL}/login`, {  //  Используем  API_BASE_URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Login failed: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("User logged in:", data);
                login(data.user, data.token);
                navigate('/');
            })
            .catch((error) => {
                console.error("Login error:", error);
                setErrors({ ...errors, backend: error.message });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
        }
    };

    return (
        // <motion.div
        //     className="container"
        //     initial={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     transition={{ duration: 0.5 }}
        // >
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="loginIdentifier">Email or Name:</label>
                    <input
                        type="text"
                        id="loginIdentifier"
                        name="loginIdentifier"
                        value={formData.loginIdentifier || ''}
                        onChange={handleChange}
                        required
                    />
                    {errors.loginIdentifier && (
                        <p className="error-message">{errors.loginIdentifier}</p>
                    )}
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    required
                />
                {errors.password && (
                    <p className="error-message">{errors.password}</p>
                )}
                </div>
                {errors.backend && <p className="error-message">{errors.backend}</p>}
                <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Logging In..." : "Login"}
                </button>
            </form>
            </div>
        // </motion.div>
    );
};

export default LoginForm;