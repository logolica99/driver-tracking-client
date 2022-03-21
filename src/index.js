import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { ApplicantInformationContextProvider } from "./context/ApplicantInformationContext";
import { DriverExperienceContextProvider } from "./context/DriverExperienceContext";
import { PrevEmploymentContextProvider } from "./context/PrevEmploymentContext";
import { VehicleIntventoryContextProvider } from "./context/VehicleInventoryContext";
ReactDOM.render(
  <BrowserRouter basename="/apps/form">
    <AuthContextProvider>
      <ApplicantInformationContextProvider>
        <PrevEmploymentContextProvider>
          <DriverExperienceContextProvider>
            <VehicleIntventoryContextProvider>
              <App />
            </VehicleIntventoryContextProvider>
          </DriverExperienceContextProvider>
        </PrevEmploymentContextProvider>
      </ApplicantInformationContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
