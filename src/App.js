import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./component/Home/Home.js";
import NavSideBar from "./component/NavSideBar/NavSideBar.js";
import UserList from "./component/UserList/UserList.js";
import BookList from "./component/BookList/BookList.js";
import BookDetails from "./component/BookDetails/BookDetails.js";
import SearchForm from "./component/SearchForm/SearchForm.jsx";
import "./CSS/style.css";
import Profile from "./component/Profile/Profile.js";
import Login from "./component/Login/Login.js";
import Register from "./component/Register/Register.js";
import AccountControl from "./component/AccountControl/AccountControl.js";

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
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<SearchForm />} />
              <Route path="/search/:searchContent" element={<BookList />} />
              <Route path="/search/:searchContent/:id" element={<BookDetails />} />
              <Route path="/users/login" element={<Login />} />
              <Route path="/users/register" element={<Register />} />
              <Route path="/users/profile" element={<Profile />} />
            </Routes>
          </div>
          <div className="col-md-2 d-none d-md-block">
            <UserList />
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
