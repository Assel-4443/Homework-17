import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./ThemeContext"; // 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Router> 
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
