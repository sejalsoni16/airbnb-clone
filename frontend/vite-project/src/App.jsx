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
import MyListing from "./pages/MyListing.jsx";
import ViewCard from "./pages/ViewCard.jsx";
import MyBooking from "./pages/MyBooking.jsx";
import Booked from "./pages/Booked.jsx";

function App() {
  let {userData} = useContext(userDataContext);

  return (
    <Routes>
      <Route path="/"   
        element={<Home />} />
      <Route path="/login" 
        element={<Login />} />
      <Route path="/signup" 
        element={<SignUp />} />
      <Route path="/listingpage1" 
        element={userData != null ? <ListingPage1/>:<Navigate to={"/"}/>} />
      <Route path="/listingpage2" 
        element={userData != null ? <ListingPage2/>:<Navigate to={"/"}/>} />
      <Route path="/listingpage3" 
        element={userData != null ? <ListingPage3/>:<Navigate to={"/"}/>} />
      <Route path="/mylisting" 
        element={userData != null ? <MyListing/>:<Navigate to={"/"}/>} />
      <Route path="/viewcard" 
        element={userData != null ? <ViewCard/>:<Navigate to={"/"}/>} />
      <Route path="/mybooking" 
        element={userData != null ? <MyBooking/>:<Navigate to={"/"}/>} />
      <Route path="/booked" 
        element={userData != null ? <Booked/>:<Navigate to={"/booked"}/>} />
    </Routes>
  );
}

export default App;