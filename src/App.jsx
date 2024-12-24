import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import WeatherDashboard from "./components/WeatherCard";

const App = () => (
    <ThemeProvider>
        <WeatherDashboard />
    </ThemeProvider>
);

export default App;
