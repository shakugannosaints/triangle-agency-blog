import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// GitHub Pages SPA 重定向处理
const spaRedirect = sessionStorage.getItem('spa-redirect');
if (spaRedirect) {
  sessionStorage.removeItem('spa-redirect');
  const { path, search, hash } = JSON.parse(spaRedirect);
  if (path && path !== '/' && path !== window.location.pathname) {
    window.history.replaceState(null, '', path + search + hash);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
