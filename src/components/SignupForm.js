import React, { useState } from "react";
// import { motion } from "framer-motion"; // Уже закомментировано
import { useNavigate } from 'react-router-dom';
import "../styles/components/SignupForm.scss";
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'https://orange-engine-jj7g57j94xqw3j6gr-5000.app.github.dev/api/auth'; //  НОВЫЙ URL!

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (!formData.name) {
            newErrors.name = "Name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);
            console.log("data for submit", formData)

            fetch(`${API_BASE_URL}/register`, { //  Используем  API_BASE_URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Registration failed: ${response.status}`);
                }
                return response.json();
              })
            .then((data) => {
                console.log("User registered:", data);
                login(data.user, data.token);
                navigate('/');
            })
            .catch((error) => {
                console.error("Signup error:", error);
                setErrors({ ...errors, backend: error.message });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
        }
    };

    return (
        //<motion.div
        //    className="container"
        //    initial={{ opacity: 0 }}
        //    animate={{ opacity: 1 }}
        //    transition={{ duration: 0.5 }}
        //>
            <div className="signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
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
                <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword || ''}
                    onChange={handleChange}
                    required
                />
                {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                )}
                </div>
                {errors.backend && <p className="error-message">{errors.backend}</p>}
                <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
            </div>
        //</motion.div>
    );
};

export default SignupForm;