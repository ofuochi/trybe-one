import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AppRoutes } from "./components/Common/AppRoutes";
import { StoreProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer />
    </StoreProvider>
  );
};

export default App;
