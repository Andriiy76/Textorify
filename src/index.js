import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; //  Импортируем  AuthProvider

const root = createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>  {/*  Оборачиваем  App  в  AuthProvider  */}
        <App />
    </AuthProvider>
);