import { Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./assets/App.css";
import ListingPage1 from "./pages/ListingPage1.jsx";
import ListingPage2 from "./pages/ListingPage2.jsx";
import ListingPage3 from "./pages/ListingPage3.jsx";
import { useContext } from "react";
import { userDataContext } from "./Context/UserContext.jsx";

function App() {
  let {userData} = useContext(userDataContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/listingpage1" element={userData != null ? <ListingPage1/>:<Navigate to={"/login"}/>} />
      <Route path="/listingpage2" element={userData != null ? <ListingPage2/>:<Navigate to={"/login"}/>} />
      <Route path="/listingpage3" element={userData != null ? <ListingPage3/>:<Navigate to={"/login"}/>} />
    </Routes>
  );
}

export default App;