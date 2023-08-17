import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // 导入 Provider
import App from "./App.js";
// import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from "./context.js";
import store from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store}> 
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
    </React.StrictMode>
  );

// reportWebVitals();