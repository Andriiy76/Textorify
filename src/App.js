// textorify-frontend/src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import PricingPage from "./components/PricingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import VerifyEmail from "./components/VerifyEmail"; // Импортируем
// import ProtectedRoute from "./components/ProtectedRoute"; // Пока не используем

import "./styles/index.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);

function App() {
    console.log("App component rendering");

    useEffect(() => {
        console.log("useEffect in App");
        document.body.classList.remove("dark"); // (Если нужно) Убрать класс 'dark'
    }, []);

    return (
        <Router future={{ v7_startTransition: true }}> {/*  Включаем флаг! */}
            <div className="App">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <HeroSection />
                                <Features />
                                <HowItWorks />
                                <Pricing />
                                <Testimonials />
                                <FAQ />
                            </>
                        } />
                        <Route path="/services" element={<Services />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/verify-email/:token" element={<VerifyEmail />} /> {/* Добавляем маршрут */}

                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;