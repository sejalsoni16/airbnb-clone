import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext.jsx";
import UserContext from "./Context/UserContext.jsx";
import ListingContext from "./Context/listingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ListingContext>
          <UserContext>
            <App />
          </UserContext>
        </ListingContext>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);