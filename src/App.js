import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import NavSideBar from "./component/NavSideBar/NavSideBar.js";
import BookList from "./component/BookList/BookList.js";
import BookDetails from "./component/BookDetails/BookDetails.js";
import SearchForm from "./component/SearchForm/SearchForm.jsx";
import "./CSS/style.css";
import Profile from "./component/Profile/Profile.js";
import Login from "./component/Login/Login.js";
import Register from "./component/Register/Register.js";
import AccountControl from "./component/AccountControl/AccountControl.js";
import RecentLogin from "./component/RecentLogin/RecentLogin.js";
import HomeBookDetails from "./component/HomeBookRecommend/HomeBookDetails.js";
import ProfileOther from "./component/ProfileOther/ProfileOther.js";
import UserDashboard from "./component/UserDashboard/UserDashboard.js";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  
  return (
    <Router>
      <div className={`container-fluid ${darkMode ? "dark" : "light"}`} style={{ padding: "50px" }}>
        <div className="row">
          <div className="col-2 col-md-2" style={{ marginTop: "20px" }}>
            <NavSideBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <AccountControl/>
          </div>
          <div className="col-10 col-md-8">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/home/:id" element={<HomeBookDetails />} />
              <Route path="/search" element={<SearchForm />} />
              <Route path="/search/:searchContent" element={<BookList />} />
              <Route path="/search/:searchContent/:id" element={<BookDetails />} />
              <Route path="/users/login" element={<Login />} />
              <Route path="/users/register" element={<Register />} />
              <Route path="/users/profile" element={<Profile />} />
              <Route path="/users/profile/:id" element={<ProfileOther />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
          </div>
          <div className="col-md-2 d-none d-md-block">
            <RecentLogin/>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
