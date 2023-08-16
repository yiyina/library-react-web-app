import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./component/Home/Home.js";
import NavSideBar from "./component/NavSideBar/NavSideBar.js";
import UserList from "./component/UserList/UserList.js";
import BookList from "./component/BookList/BookList.js";
import BookDetails from "./component/BookDetails/BookDetails.js";
import SearchForm from "./component/SearchForm/SearchForm.jsx";
import "./CSS/style.css";
import Profile from "./component/Profile/Profile.js";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <HashRouter>
      <div className={`container-fluid ${darkMode ? "dark" : "light"}`} style={{ padding: "50px" }}>
        <div className="row">
          <div className="col-2 col-md-2" style={{ marginTop: "20px" }}>
            <NavSideBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          <div className="col-10 col-md-8">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<SearchForm />} />
              <Route path="/book" element={<BookList />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <div className="col-md-2 d-none d-md-block">
            <UserList />
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
export default App;
