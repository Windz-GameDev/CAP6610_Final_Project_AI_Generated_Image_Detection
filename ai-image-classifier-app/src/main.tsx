import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.css";

// Use bootswatch darkly
import "../bootswatch/bootstrap_darkly.min.css";

// Use bootswatch lux
// import "../bootswatch/bootstrap_lux.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
