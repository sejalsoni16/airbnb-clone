import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext.jsx";
import UserContext from "./Context/UserContext.jsx";
import ListingContext from "./Context/ListingContext.jsx";
import BookingContext from "./Context/BookingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ListingContext>
          <UserContext>
            <BookingContext>
              <App />
            </BookingContext>
          </UserContext>
        </ListingContext>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);